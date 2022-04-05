import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";

function Menu(props) {
  const userId = localStorage.getItem("userId");
  return (
    <div className={styles.menuContainer}>
        <img src={require("../images/clink.png")} height= {70} alt="logo" />
        {props.isLoggedIn ? (
          <NavLink to={`/users/${userId}/profile`}>Profile</NavLink>
        ) : null}
        {props.isLoggedIn ? (
          <NavLink to={`/users/${userId}/recommendations`}>
            {" "}
            Recommendations
          </NavLink>
        ) : null}
        {!props.isLoggedIn ? <NavLink to="/">Login</NavLink> : null}
        {!props.isLoggedIn ? <NavLink to="/register">Register</NavLink> : null}
        {props.isLoggedIn ? <NavLink to="/logout">Logout</NavLink> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Menu);
