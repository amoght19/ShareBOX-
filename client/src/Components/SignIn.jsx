import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider.jsx";

import axios from "axios";
import styles from "../Styles/SignIn.module.css";

const serverUrl = "http://localhost:8000";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setName, setEmail, setFiles } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(serverUrl + "/api/signin", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: res.data.token,
          })
        );

        const userData = JSON.parse(res.data.data);

        setName(userData.username);
        setEmail(userData.email);
        setFiles(userData.files);

        navigate("/home");
      })
      .catch((err) => {
        navigate("/error");
      });
  };
  return (
    <div className={styles.container}>
      <h1>ShareBOX+</h1>
      <form className={styles.form}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"Username"}
          className={styles.input}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Password"}
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button} type="button">
          Sign In
        </button>
        <Link to={"/sign-up"}>Not a register user?</Link>
      </form>
    </div>
  );
};

export default SignIn;
