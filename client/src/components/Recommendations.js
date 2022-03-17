import React, { useState, useEffect } from "react";
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
        console.log("RECS", recs);
        setRecommendations(recs.recommendations);
      }
    } catch (error) {
      console.log("ERROR MESSAGE",error);
    }
  };

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className={styles.recContainer}>
      <h2>Drinks You Can Make</h2>
      {recommendations.map((r) => (
        <RecommendationCard recommendation={r} />
      ))}
    </div>
  );
};

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className={styles.recCard}>
      <h3>{recommendation.name}</h3>
      <ul>
        {recommendation.recipe.ingredients.map((i)=> (
          <li>
            {i.item} ({i.amount})
          </li>
        ))}
      </ul>
      <h4>Instructions</h4>
      <p>{recommendation.recipe.instructions}</p>
    </div>
  );
};

export default Recommendations;
