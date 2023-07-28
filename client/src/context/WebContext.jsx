import React, { useState, useEffect, createContext } from 'react';

// Create a context for the Web Provider
export const WebContext = createContext();

/**
 * Component representing the Web Provider
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The children to be rendered inside the provider
 * @returns {JSX.Element} - The JSX element
 */
export function WebProvider({ children }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Close the alert after a specified time interval
   */
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
        setSuccess(false);
      }, 3500);

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
