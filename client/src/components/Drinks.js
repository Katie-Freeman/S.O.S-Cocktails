import React, { useState } from "react";
import IngredientSearch from "./IngredientSearch";
import styles from "./drinks.module.css";

function Drinks() {
  const [drink, setDrink] = useState({});

  const handleTextChange = (e) => {
    setDrink({
      ...drink,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavedDrink = () => {
    fetch("http://localhost:8080/drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drink),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className={styles.drinkContainer}>
      <IngredientSearch />
      <h1>Drink Recomendations</h1>
      <input type="text" onChange={handleTextChange} name="name" />
      <input type="text" onChange={handleTextChange} name="imgUrl" />
      <textarea type="text" onChange={handleTextChange} name="recipe" />
      <button onClick={handleSavedDrink}>Submit</button>
    </div>
  );
}

export default Drinks;
