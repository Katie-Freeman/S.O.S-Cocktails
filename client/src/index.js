import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import authReducer from "./store/authReducer";
import guestReducer from "./store/guestReducer";
import thunk from "redux-thunk";
import BaseLayout from "./components/baseLayout/BaseLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Drinks from "./components/Drinks";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Recommendations from "./components/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";

const rootReducer = combineReducers({
  authReducer,
  guestReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const token = localStorage.getItem("jsonwebtoken");
store.dispatch({ type: "ON_LOGIN", payload: token });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/users/:id/recommendations"element={<Recommendations />}/>
            <Route path="/users/:id/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>
            <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
