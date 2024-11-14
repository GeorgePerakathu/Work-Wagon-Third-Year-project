import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {

    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isUserSignedIn, setIsUserSignedIn] = useState(() => {
    return localStorage.getItem("isUserSignedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isUserSignedIn", isUserSignedIn);
  }, [isUserSignedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isUserSignedIn, setIsUserSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
