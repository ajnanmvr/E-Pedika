
import React, { createContext, useState } from "react";
import Axios from "../Axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserDataFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("/user", {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          setUser(response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.response);
        });
    } else {
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getUserDataFromLocalStorage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
