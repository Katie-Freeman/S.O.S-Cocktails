import { createDispatchHook } from "react-redux";

export const fetchDrink = () => {
  return (dispatch) => {
    fetch("http://localhost:8080/drinks/:drinkId")
      .then((response) => response.json())
      .then((drink) => {
        createDispatchHook({ type: "DRINK_FETCHED", payload: drink });
      });
  };
};

export const deleteIngredent = (userId) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
  };
};
