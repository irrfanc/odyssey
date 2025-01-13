import { motion } from 'framer-motion';
import { BiLoaderAlt } from 'react-icons/bi';

const TypingIndicator = () => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    >
      <BiLoaderAlt className="animate-spin text-xl text-gray-500" />
      <span className="text-sm text-gray-500">Typing...</span>
    </motion.div>
  );
};

export default TypingIndicator;
