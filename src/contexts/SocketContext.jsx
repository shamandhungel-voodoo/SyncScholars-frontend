import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Create WebSocket connection
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
    });

    setSocket(newSocket);

    // Connection events
    newSocket.on('connect', () => {
      console.log('✅ WebSocket Connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ WebSocket Disconnected');
      setIsConnected(false);
    });

    // Cleanup
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinGroup = (groupId) => {
    if (socket && isConnected) {
      socket.emit('join-group', groupId);
    }
  };

  const sendMessage = (groupId, message, user) => {
    if (socket && isConnected) {
      socket.emit('send-message', { groupId, message, user });
    }
  };

  const startTimer = (groupId, timeLeft, mode) => {
    if (socket && isConnected) {
      socket.emit('timer-start', { groupId, timeLeft, mode });
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      joinGroup,
      sendMessage,
      startTimer
    }}>
      {children}
    </SocketContext.Provider>
  );
};