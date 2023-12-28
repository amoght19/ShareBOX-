import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);

  return user;
};

export const UserProvider = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        files,
        setFiles,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
