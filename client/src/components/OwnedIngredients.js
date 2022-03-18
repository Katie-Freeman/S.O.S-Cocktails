import React, { useState, useEffect } from "react";
import styles from "./ownedIngredients.module.css";

const OwnedIngredients = ({ ingredients, isLoading }) => {
  const [userIngredients, setUserIngredients] = useState(ingredients);

  useEffect(() => {
    setUserIngredients(ingredients);
  }, [ingredients]);


  return !ingredients ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>Owned Ingredients:</h2>
      <div className={styles.ownedIngredients}>
        {userIngredients.map((ingredient) => (
          <div key={ingredient.id} className={styles.ingredientTag}>
            {ingredient.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default OwnedIngredients; 
