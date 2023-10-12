// UserContext.js

import React, { createContext, useEffect, useState } from "react";
import Axios from "../Axios";
// Create the UserContext
const UserContext = createContext();

// Create a provider for the UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Add any other user-related state and functions here if needed
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
          return response.data; // Assuming the API returns user data in the response
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.response);
        });
    } else {
      // window.location.href = "/";
    }
  };

  // Call the getUserDataFromLocalStorage when the component mounts
  // useEffect(() => {
  //   getUserDataFromLocalStorage();
  // }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, getUserDataFromLocalStorage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
