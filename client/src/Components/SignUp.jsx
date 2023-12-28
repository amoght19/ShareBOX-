import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Styles/SignIn.module.css";
import { useUser } from "../context/UserProvider";

const serverURL = "https://sharebox-9lqk.onrender.com";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { setName, setEmail, setFiles } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(serverURL + "/api/signup", {
        email: userEmail,
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
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder={"Email"}
          className={styles.input}
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"Username"}
          className={styles.input}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"Set password"}
          className={styles.input}
        />

        <button onClick={handleSubmit} className={styles.button}>
          Sign Up
        </button>
        <Link to={"/"}>Already a user?</Link>
      </form>
    </div>
  );
};

export default SignUp;
