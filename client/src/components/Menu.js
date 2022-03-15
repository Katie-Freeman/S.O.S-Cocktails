import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./menu.module.css";

function Menu(props) {
  return (
    <div className={styles.menuContainer}>
      
      <div className={styles.menuOptions}>
        {" "}
        <NavLink to="/profile">Home</NavLink>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Menu);
