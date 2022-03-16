
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";


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
        console.log("LOGING IN AS GUEST", result);
        if (result.success) {
          const token = result.token;
          localStorage.setItem("username", result.user.username);
          localStorage.setItem("userId", result.user.id);
          localStorage.setItem("jsonwebtoken", token);
          localStorage.setItem("isGuest", true)
          props.onLogin(token);
          navigate("/");
        } else {
        }
      });
  };

  return (
    <div className="login container">
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
