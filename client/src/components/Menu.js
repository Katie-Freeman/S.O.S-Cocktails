import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function Menu(props) {
  return (
    <div>
      <NavLink to="/profile">Home</NavLink>
      <NavLink to="/ingredients">Ingredients</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Menu);
