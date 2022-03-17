import React, { useState, useEffect } from 'react'
import styles from "./recommendations.module.css";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    getFavorites();
  }, [])
  const userId = localStorage.getItem("userId");
  const getFavorites = async() => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}/get-favorites`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
      },
    })
    const responseJson = await response.json()
    console.log("RESPONSEJSON",responseJson)
    if(responseJson) {
      setFavorites(responseJson.favorites)
    }
  } catch(error){
    console.log(error)
  }
}
    
  return (
    <div className= {styles.favorites}>
        <h2>Favorites</h2>
    {favorites.map((favorite) => <FavoritesCard key={favorite.id} favorite={favorite}/>)}
    </div>
  )
}

const FavoritesCard = ({ favorite }) => {
 
  return (
    <div className={styles.recCard}>
      <h3>{favorite.name}</h3>
      <ul>
        {favorite.recipe.ingredients.map((i) => (
          <li key={i.item}>
            {i.item} ({i.amount})
          </li>
        ))}
      </ul>
      <h4>Instructions</h4>
      <p>{favorite.recipe.instructions}</p>
    </div>
  );
};


export default Favorites