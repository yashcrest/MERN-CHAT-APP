import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: userInfo._id,
        },
      });
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]);
  return (
    <SocketContext.Provider value={(socket, onlineUsers)}>
      {children}
    </SocketContext.Provider>
  );
};
