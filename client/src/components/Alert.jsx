import React from "react";

import AlertIcon from "./AlertIcon";

const Alert = ({ success, message }) => (
  <div
    className={`absolute z-10 top-20 left-0 right-0 flex items-center justify-center`}
  >
    <div
      className={`p-4 rounded-lg font-semibold text-lg ${
        success
          ? "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800"
          : "text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      }`}
      role="alert"
    >
      <AlertIcon success={success} /> {message}
    </div>
  </div>
);

export default Alert;
