import React, { useState, useEffect, useCallback } from "react";
import Heart from "react-animated-heart";
import styles from "./recommendations.module.css";

const Recommendations = () => {
  useEffect(() => {
    fetchRecs();
  }, []);

  const fetchRecs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/users/${userId}/recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const recs = await response.json();

      if (recs) {
        setRecommendations(recs.recommendations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className={styles.recContainer}>
      <h2>Drinks You Can Make</h2>
      {recommendations.map((r) => (
        <RecommendationCard recommendation={r} key={r.id} />
      ))}
    </div>
  );
};

const RecommendationCard = ({ recommendation }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = localStorage.getItem("userId");

  const getUserFavorites = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${userId}/get-favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseJson = await response.json();

      if (responseJson) {
        const favoriteIds = responseJson.favorites.map((f) => f.id);
        if (favoriteIds.includes(recommendation.id)) {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getUserFavorites();
  }, [recommendation, getUserFavorites]);

  const handleFavoriteClick = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(
        `http://localhost:8080/users/${userId}/favorites`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            drinkId: recommendation.id,
          }),
        }
      );
      const responseJson = await response.json();

      if (responseJson) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.recCard}>
      <h3>{recommendation.name}</h3>
      <ul>
        {recommendation.recipe.ingredients.map((i) => (
          <li key={i.item}>
            {i.item} ({i.amount})
          </li>
        ))}
      </ul>
      <h4>Instructions</h4>
      <p>{recommendation.recipe.instructions}</p>
      <Heart isClick={isFavorite} onClick={handleFavoriteClick} />
    </div>
  );
};

export default Recommendations;
