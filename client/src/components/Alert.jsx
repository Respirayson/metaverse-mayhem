import React from 'react';
import { motion } from 'framer-motion';
import AlertIcon from './AlertIcon';
import { fadeAnimation } from '../utils/motion';

/**
 * Component for displaying an alert message.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.success - Flag indicating if it's a success message (true) or an error message (false).
 * @param {string} props.message - The content of the alert message.
 * @returns {JSX.Element} Alert component.
 */
function Alert({ success, message }) {
  return (
    <motion.div
      {...fadeAnimation}
      className="absolute z-10 top-20 left-0 right-0 flex items-center justify-center"
    >
      <div
        className={`p-4 rounded-lg font-semibold text-lg ${
          success
            ? 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
            : 'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
        }`}
        role="alert"
      >
        {/* AlertIcon component for indicating success or error */}
        <AlertIcon success={success} />
        {' '}
        {message}
      </div>
    </motion.div>
  );
}

export default Alert;
