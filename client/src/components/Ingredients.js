import React, { useState } from "react";
import styles from "./ingredients.module.css";

function Ingredients() {
  const [ingredient, setIngredient] = useState({});

  const handleTextChange = (e) => {
    setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    });
  }

    const handleSavedIngredient = () => {
    fetch("http://localhost:8080/ingredients", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient),
    })
    .then((response) => response.json())
    .then((result)=> {
        console.log(result)
    })
  };



  return (
    <div className={styles.ingredientsContainer}>
      <h1>ingredients on hand</h1>
      <input type="text" placeholder="Enter ingredient" onChange={handleTextChange} name="name" />
      <button onClick={handleSavedIngredient}>Submit</button>
    </div>
  );
}

export default Ingredients;
