
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <img src={require("./images/logo.gif")} alt="logo"/>
      <Login />
    </div>
  );
}

export default App;
