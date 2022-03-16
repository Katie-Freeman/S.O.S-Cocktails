import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";

/* 'isGuest' stuff */
  /*
  const isGuest = localStorage.getItem('isGuest');
  <Menu>
    Login
    {isAuthenticated || isGuest && (
      <link>Register</link>
    ) }
  </Menu>
  */

function Menu(props) {
  return (
    <div className={styles.menuContainer}>
      {/* <img className={styles.logo} src={require("../images/Logo.png")} /> */}
      <div className={styles.menuOptions}>
        {" "}
        <NavLink to="/users">Home</NavLink>
      </div>
      <div className={styles.menuOptions}>
        <NavLink to="/ingredients">Ingredients</NavLink>
      </div>
      <div className={styles.menuOptions}>
        <NavLink to="/login">Login</NavLink>
      </div>
      <div className={styles.menuOptions}>
        <NavLink to="/register">Register</NavLink>
      </div>
      <div className={styles.menuOptions}>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Menu);
