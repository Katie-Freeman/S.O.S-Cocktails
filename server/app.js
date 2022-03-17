const express = require("express");
const path = require("path");
const models = require("./models");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const publicPath = path.join(__dirname, "..", "public");
const app = express();
const sequelize = require("sequelize");
const authenticate = require('./middlware/authenticate')

require("dotenv").config();


app.use(express.json());
app.use(cors());
app.use(express.static(publicPath));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'../client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', "static", "index.html")))
}else{
  app.get('/', (res, req) => res.send('Please set to production'))
}

// app.get("*", (req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  models.User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (user) {
        // if the user already exists
        res.json({ success: false, message: "Username already exists!" });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            const user = models.User.build({
              username: username,
              password: hash,
            });

            // save the user
            user.save().then((savedUser) => {
              res.json({ success: true, message: "User has been saved!" });
            });
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  models.User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { username: user.username },
            process.env.JWTKEY
          );

          res.json({ success: true, user: user, token: token });
        } else {
          res.json({ success: false, message: "Not authenticated!" });
        }
      });
    } else {
      res.json({ success: false, message: "Authentication failed!" });
    }
  });
});

app.post("/drinks", (req, res) => {
  const name = req.body.name;
  const imgUrl = req.body.imgUrl;
  const recipe = req.body.recipe;

  const drink = models.Drink.build({
    name: name,
    imageUrl: imgUrl,
    recipe: recipe,
  });

  drink
    .save()
    .then((_) => {
      res.json({ success: true, message: "Drink Saved!" });
    })
    .catch((error) => res.json({ success: false, message: error }));
});

app.post("/ingredients", (req, res) => {
  const name = req.body.name;
  const type = req.body.type;

  const ingredient = models.Ingredient.build({
    name: name,
    type: type,
  });

  ingredient
    .save()
    .then((_) => {
      res.json({ success: true, message: "Ingredient added!" });
    })
    .catch((error) => res.json({ success: false, message: error }));
});

app.post("/ingredients/search",(req, res) => {
  let query = req.body.query.toLowerCase();

  models.Ingredient.findAll({
    limit: 10,
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + query + "%"
      ),
    },
  })
    .then(function (matches) {
      return res.json({
        msg: "message",
        matches,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/users/:id/ingredients", (req, res) => {
  const { id } = req.params;

  models.User.findByPk(id)
    .then(async (user) => {
      const userIngredients = await user.getIngredients();
      return res.json(userIngredients);
    })
    .catch((error) => console.log(error));
});

app.post("/users/:id/add-ingredients", (req, res) => {
  const { id } = req.params;
  const { ingredientId } = req.body;

  models.User.findByPk(id)
    .then(async (user) => {
      const added = await user.addIngredients([ingredientId]);
      if (added) {
        const ingredients = await user.getIngredients();
        return res.json({ ingredients });
      } else {
        return res.json({ error: "Could not add ingredient" });
      }
    })
    .catch((error) => res.json(error));
});

app.delete("/users/:id/ingredients", (req, res) => {
  const { id } = req.params;
  const { ingredientId } = req.body;

  models.User.findByPk(id)
    .then(async (user) => {
      const success = await user.removeIngredients([ingredientId]);
      if (success) {
        const ingredients = await user.getIngredients();
        return res.json({ ingredients });
      } else {
        return res.json({ error: "Could not add ingredient" });
      }
    })
    .catch((error) => res.json(error));
});

app.post('/users/:id/recommendations', async (req, res) => {
  try {
  const { id } = req.params;
  const user = await models.User.findByPk(id);
  const userIngredients = await user.getIngredients();
  const userIngredientIds = userIngredients.map(ingredient => ingredient.id);
  const drinksUserCanMake = []
  const allDrinks = await models.Drink.findAll({ include: models.Ingredient});

  if (userIngredientIds.length > 0) {
  allDrinks.forEach(drink => {
   const drinkIngredientIds = (drink.Ingredients.map(i => i.id));
    const hasAllIngredients = drinkIngredientIds.every(i => userIngredientIds.includes(i))
    if (hasAllIngredients) {
      drinksUserCanMake.push(drink)
    }
  })
  }
  return res.json({ recommendations: drinksUserCanMake });
  } catch (error) {
    console.log('ERROR', error)
  }
})

app.post('/users/:id/favorites', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { drinkId } = req.body;
    const user = await models.User.findByPk(userId)
    const success = await user.addDrinks([drinkId]);
    if (success) {
      return res.json({ success: true, })
    }
  } catch(error) {
    return res.json(error)
  }
})

app.post('/users/:id/get-favorites', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await models.User.findByPk(userId);
    const favorites = await user.getDrinks();
    
    if (favorites) {
      return res.json({ success: true, favorites })
    }
  } catch(error) {
      console.log("ERROR MESSAGE", error);
    return res.json(error)
  
  }
})

app.delete('/users/:id/favorites', async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { drinkId } = req.body;
    const user = await models.User.findByPk(userId);
    const success = await user.removeDrinks([drinkId]);
    if (success) {
      return res.json({ success: true })
    }
  } catch(error) {
    return res.json(error)
  }
})

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running ....");
});
