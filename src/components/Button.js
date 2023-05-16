import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ show, handleBtnClick }) => {
  return (
    <motion.button
      className="bg-blue-700 text-white px-4 py-2 rounded-md"
      animate={{ y: show ? -900 : 0 }}
      transition={{ duration: 1, ease: 'ease-in-out', type: 'spring' }}
      onClick={handleBtnClick}
    >
      Submit
    </motion.button>
  );
};

export default Button;
