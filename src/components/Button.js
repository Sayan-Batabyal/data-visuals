import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ show, handleBtnClick }) => {
  return (
    <motion.button
      className={'bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-teal-300 hover:text-black hover:font-medium  transition-all duration-75 ease-in' }
      animate={{ y: show ? -1000 : 0 ,display: show ? 'none' : 'block'}}
      transition={{ duration: 1, ease: 'ease-in-out', type: 'spring' }}
      onClick={handleBtnClick}
    >
      Submit
    </motion.button>
  );
};

export default Button;
