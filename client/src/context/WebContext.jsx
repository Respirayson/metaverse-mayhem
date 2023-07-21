import React, { useState, useEffect, createContext } from 'react';

export const WebContext = createContext();

export function WebProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
        setSuccess(false);
      }, [3500]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <WebContext.Provider
      value={{
        showAlert,
        setShowAlert,
        alertMessage,
        setAlertMessage,
        success,
        setSuccess,
      }}
    >
      {children}
    </WebContext.Provider>
  );
}
