import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser?.token) setUser(savedUser); // siguro që ka token të vlefshëm
    } catch (err) {
      console.error("Gabim në marrjen e user nga localStorage", err);
      localStorage.removeItem("user"); // heq të dhënat e korruptuara
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
