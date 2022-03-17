import React from "react";
import Favorites from "./Favorites";
import IngredientSearch from "./IngredientSearch";
import styles from "./profile.module.css";


function Profile(props) {
const username= localStorage.getItem("username")

  return (
    <div className={styles.profileContainer}>
      <h1>Trader {username}'s</h1>
      <div>
        <IngredientSearch />
      </div>
    <Favorites/>
    </div>
  ); 
}


export default Profile
