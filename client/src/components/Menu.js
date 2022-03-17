import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";

function Menu(props) {
  const userId = localStorage.getItem("userId");
  console.log(props)
  return (
    <div className={styles.menuContainer}>
      {/* <img className={styles.logo} src={require("../images/Logo.png")} /> */}
      <div className={styles.menuOptions}>
        {props.isLoggedIn ? <NavLink to={`/users/${userId}/profile`}>Profile</NavLink> : null}
        {props.isLoggedIn ? <NavLink to="/ingredients">Ingredients</NavLink> : null}
        {props.isLoggedIn ? <NavLink to={`/users/${userId}/recommendations`}> Recommendations</NavLink> : null}
        {!props.isLoggedIn ? <NavLink to="/login">Login</NavLink> : null}
        {!props.isLoggedIn ? <NavLink to="/register">Register</NavLink> : null}
        {props.isLoggedIn ? <NavLink to="/logout">Logout</NavLink> :null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isLoggedIn: state.authReducer.isAuthenticated,
    isGuest: state.guestReducer.isGuest
  };
};

export default connect(mapStateToProps)(Menu);
