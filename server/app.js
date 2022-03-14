const express = require("express");
const models = require("./models");
const sequelize = require("sequelize");
var bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

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
          const token = jwt.sign({ username: user.username }, "SECRETKEY");

          res.json({ success: true, token: token });
        } else {
          res.json({ success: false, message: "Not authenticated!" });
        }
      });
    } else {
      res.json({ success: false, message: "Authentication failed!" });
    }
  });
});

app.post('/drinks', (req, res) => {
    const name= req.body.name
    const imgUrl = req.body.imgUrl
    const recipe = req.body.recipe

    const drink = models.Drink.build({
        name:name,
        imageUrl:imgUrl,
        recipe:recipe
    })

    drink
      .save()
      .then((_) => {
        res.json({ success: true, message: "Drink Saved!" });
      })
      .catch((error) => res.json({ success: false, message: error }));
})

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

app.listen(8080, () => {
  console.log("Server is running ....");
});
