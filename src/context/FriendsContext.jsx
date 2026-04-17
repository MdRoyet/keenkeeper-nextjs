"use client"; // Required because Context uses React hooks

import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Create the Context
const FriendsContext = createContext();

// 2. Create the Provider Component
export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the public folder when the app loads
  useEffect(() => {
    const loadFriends = async () => {
      try {
        // Because it's in public/data, we just use the absolute path
        const response = await fetch("/data/friends.json");
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Failed to load friends data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFriends();
  }, []);

  // We pass 'friends' and 'setFriends' down so other components can read OR update the data
  return (
    <FriendsContext.Provider value={{ friends, setFriends, isLoading }}>
      {children}
    </FriendsContext.Provider>
  );
};

// 3. Create a custom hook to make using the context super easy
export const useFriends = () => {
  return useContext(FriendsContext);
};
