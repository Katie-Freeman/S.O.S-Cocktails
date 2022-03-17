import React, { useState, useEffect } from "react";
import styles from "./ingredientSearch.module.css";
import OwnedIngredients from "./OwnedIngredients";

const IngredientSearch = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserIngredients = () => {
    setIsLoading(true);
    const id = localStorage.getItem("userId");
    fetch(`http://localhost:8080/users/${id}/ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((ownedIngredients) => {
        setIsLoading(false);
        setUserIngredients(ownedIngredients);
      });
  };
  const fuzzySearch = () => {
    fetch("http://localhost:8080/ingredients/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: search }),
    })
      .then((response) => response.json())
      .then((res) => setResults(res.matches));
  };

  useEffect(() => {
    getUserIngredients();
  }, []);

  return (
    <div className={styles.searchContainer}>
      <OwnedIngredients ingredients={userIngredients} isLoading={isLoading} />
      <input
        className={styles.searchInput}
        type="text"
        value={search}
        placeholder="Enter an ingredient"
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={() => setTimeout(fuzzySearch(), 2000)}
      />
      <div className={styles.ingredientGrid}>
        {results.map((result) => (
          <IngredientCard
            ingredient={result}
            userIngredients={userIngredients}
            setUserIngredients={setUserIngredients}
          />
        ))}
      </div>
    </div>
  );
};

const IngredientCard = ({
  ingredient,
  userIngredients,
  setUserIngredients,
}) => {
  const ownedIngredientIds = userIngredients.map((ingredient) => ingredient.id);
  const isOwned = ownedIngredientIds.includes(ingredient.id);

  const addIngredient = (ingredientId) => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/users/${userId}/add-ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          setUserIngredients(response.ingredients);
        }
      });
  };

  const deleteIngredient = (ingredientId) => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:8080/users/${userId}/ingredients`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredientId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          setUserIngredients(response.ingredients);
        }
      });
  };

  useEffect(() => {}, [isOwned]);

  return (
    <div
      className={
        isOwned
          ? `${styles.ingredientCard} ${styles.owned}`
          : styles.ingredientCard
      }
      key={ingredient.id}
    >
      <span>{ingredient.name}</span>
      <button
        onClick={
          isOwned
            ? () => deleteIngredient(ingredient.id)
            : () => addIngredient(ingredient.id)
        }
      >
        {isOwned ? "✖️" : "✔"}️
      </button>
    </div>
  );
};

export default IngredientSearch;
