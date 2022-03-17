import React, { useState, useEffect } from "react";
import styles from "./ingredientSearch.module.css";

const OwnedIngredients = ({ ingredients, isLoading }) => {
  const [userIngredients, setUserIngredients] = useState(ingredients);

  useEffect(() => {
    setUserIngredients(ingredients);
  }, [ingredients]);

  const getUserIngredients = () => {
    const id = localStorage.getItem("userId");
    fetch(`http://localhost:8080/users/${id}/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((ownedIngredients) => setUserIngredients(ownedIngredients));
  };
  return !ingredients ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>Owned Ingredients:</h2>
      {userIngredients.map((ingredient) => (
        <span className={styles.ingredientTag}>{ingredient.name}</span>
      ))}
    </div>
  );
};

export default OwnedIngredients; 
