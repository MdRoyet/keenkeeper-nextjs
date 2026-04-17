"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: Add a state to hold our timeline events
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const loadFriends = async () => {
      try {
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

  // NEW: Function to add a new check-in to the timeline
  const addTimelineEntry = (friendName, type) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(), // e.g., "4/17/2026"
      title: `${type} with ${friendName}`,
      type: type,
    };

    // Add to the beginning of the timeline array
    setTimeline((prev) => [newEntry, ...prev]);
  };

  return (
    // Make sure to pass timeline and addTimelineEntry down!
    <FriendsContext.Provider
      value={{ friends, setFriends, isLoading, timeline, addTimelineEntry }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  return useContext(FriendsContext);
};
