import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IngredientSearch from "./IngredientSearch";
import Recommendations from "./Recommendations";

function Profile(props) {
const username= localStorage.getItem("username")

  return (
    <div>
      <h1>Trader {username}'s</h1>
      <div>
        <IngredientSearch />
      </div>
      <div>
        <h2>Favorites!</h2>
      </div>
    </div>
  ); 
}


export default Profile
