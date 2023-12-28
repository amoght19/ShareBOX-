import styles from "../Styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import { UploadFile } from "../services/api.jsx";
import backGround from "../assets/background.jpg";
import userIcon from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserProvider.jsx";
import SignIn from "./SignIn.jsx";
import { getUserData } from "../services/getUserData.jsx";

function Home() {
  const inputFileRef = useRef();
  const [file, setFile] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { name, setName, setEmail, setFiles } = useUser();

  const setUserData = async () => {
    const userData = await getUserData();
    setName(userData.username);
    setEmail(userData.email);
    setFiles(userData.files);
  };

  const navigate = useNavigate();

  const handleFileUpload = () => {
    inputFileRef.current.click();
  };

  const handleUserLogout = () => {
    localStorage.removeItem("login");
    navigate("/");
  };

  useEffect(() => {
    const getFileUrl = async () => {
      setError(false);
      if (file) {
        try {
          const fileName = file.name;
          const data = new FormData();

          data.append("name", fileName);
          data.append("file", file);

          let response = await UploadFile(data);
          setResponse("https://sharebox-9lqk.onrender.com" + response.path);
        } catch (err) {
          setErrorMessage("Something went wrong. Try again later. ");
          setError(true);
        }
      }
    };

    getFileUrl();
  }, [file]);

  useEffect(() => {
    setUserData();
  }, []);

  return name != "" ? (
    <>
      <div className={styles.topbar}>
        <Link to="/profile">
          <img src={userIcon} />{" "}
        </Link>
        <button onClick={handleUserLogout}>Logout</button>
      </div>
      <div className={styles.container}>
        <img src={backGround} alt="Banner" />
        <div className={styles.wrapper}>
          <h1>ShareBox+</h1>
          <p>Upload and share download link.</p>
          <button onClick={handleFileUpload}>Upload</button>
          <input
            type="file"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <a href={response} style={{ marginBottom: "1rem" }}>
            {response}
          </a>
          {error && (
            <p style={{ color: "red", fontWeight: "700" }}>{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <SignIn />
    </>
  );
}

export default Home;
