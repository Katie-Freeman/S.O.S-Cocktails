import { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import styles from "./login.module.css"



function Logout(props) {

useEffect(() => {
    localStorage.removeItem("jsonwebtoken");
    localStorage.removeItem("username");
    props.onLogOut();
    console.log("LOGGING OUT")
  })

      return (
        <div className={styles.logout}>
          <Login/>
        </div>
      );

}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch({ type: "ON_AUTH", payload: null }),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
