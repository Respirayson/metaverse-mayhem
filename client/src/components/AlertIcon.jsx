import React from 'react';

/**
 * Component for displaying an icon for alert messages.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.success - Flag indicating
 * if it's a success icon (true) or an error icon (false).
 * @returns {JSX.Element} AlertIcon component.
 */
function AlertIcon({ success }) {
  return (
    <svg
      aria-hidden="true"
      className={`flex-shrink-0 inline w-6 h-6 mr-2 ${
        success
          ? 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
          : 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default AlertIcon;
