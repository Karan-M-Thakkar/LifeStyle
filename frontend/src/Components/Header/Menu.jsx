import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const staggerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Menu({ className }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <motion.ul
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
    >
      <motion.li
        className="underline-offset-8 decoration-fuchsia-500 hover:underline cursor-pointer"
        variants={itemVariants}
      >
        <NavLink to="/">Home</NavLink>
      </motion.li>
      <motion.li
        className="underline-offset-8 decoration-fuchsia-500 hover:underline cursor-pointer"
        variants={itemVariants}
      >
        <NavLink to="/about">About</NavLink>
      </motion.li>
      <motion.li
        className="underline-offset-8 decoration-fuchsia-500 hover:underline cursor-pointer"
        variants={itemVariants}
      >
        <NavLink to="/contact-us">Contact Us</NavLink>
      </motion.li>
      {!isAuthenticated && (
        <motion.li
          className="underline-offset-8 decoration-fuchsia-500 hover:underline cursor-pointer"
          variants={itemVariants}
        >
          <NavLink to="/auth?mode=login">Login</NavLink>
        </motion.li>
      )}
    </motion.ul>
  );
}
