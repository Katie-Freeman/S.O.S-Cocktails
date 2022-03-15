import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, NavLink, useResolvedPath } from "react-router-dom";
import * as actionCreators from "../store/creator/actionCreator";

function Profile(props) {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    fetchUser();
  }, [id]);

  const [users, setUsers] = useState({});

  const fetchUser = () => {
    fetch(`http://localhost:8080/users/`)
      .then((response) => response.json())
      .then((user) => {
        console.log("FETCHED BOOK", users);
        setUsers(users);
      });
  };

  return users ? (
    <div>
      <h1>Trader {users.username}'s</h1>
      <h2>Saved Ingredients</h2>
      <ul>
        <li>
          {/* {user.ingredient.name} */}
          {/* <button onClick={() => props.onDelete(users.ingredient.id)}>Delete</button> */}
        </li>
      </ul>
      <NavLink to={"/ingredients"}>Add Ingredients</NavLink>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (userId) => dispatch(actionCreators.deleteIngredent(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
