
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../components/login.module.css"


function GuestLogin(props) {

    const navigate = useNavigate();
    
    const guestUser = {
    username: 'guestuser',
    password: 'guestPassword',
  }

const handleGuestLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guestUser),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const token = result.token;
          localStorage.setItem("username", result.user.username);
          localStorage.setItem("userId", result.user.id);
          localStorage.setItem("jsonwebtoken", token);
          props.onLogin(token);
          navigate(`/users/${result.user.id}/profile`);
        } else {
        }
      });
  };

  return (
    <div className={styles.logout}>
      <button onClick={handleGuestLogin}>Try as a guest</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => dispatch({ type: "ON_AUTH", payload: token }),
  };
};

export default connect(null, mapDispatchToProps)(GuestLogin);
