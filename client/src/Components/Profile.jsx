import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Profile.module.css";
import { useUser } from "../context/UserProvider";
import back from "../assets/back.png";
import SignIn from "./SignIn";
import { getUserData } from "../services/getUserData";
import Loading from "./loading";

const Profile = () => {
  const uri = "http://localhost:8000";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { name, setName, setEmail, setFiles, files, email } = useUser();

  const setUserData = async () => {
    const userData = await getUserData();
    setName(userData.username);
    setEmail(userData.email);
    setFiles(userData.files);
  };

  useEffect(() => {
    setIsLoading(true);
    setUserData();
    setIsLoading(false);
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  return name == "" && !isLoading ? (
    <>
      <SignIn />
    </>
  ) : name != "" && !isLoading ? (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.topbar}>
          <img onClick={handleBack} src={back} alt="Back" />
        </div>
        <h1>ShareBox+</h1>
        <div className={styles.info}>
          <h2>My Profile</h2>
          <p>Username : {name}</p>
          <p>Email : {email}</p>
        </div>

        <div className={styles.profileHeader}>Activity</div>
        <div className={styles.filesContainer}>
          {files.map(({ fileName, href }) => (
            <div className={styles.item} key={fileName}>
              <p>{fileName}</p> <a href={uri + href}>Link</a>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Profile;
