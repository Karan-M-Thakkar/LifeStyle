import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";

const staggerVariants = {
  hidden: {
    x: "-100%",
    transition: {
      type: "tween",
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function MenuMobile({ className, hideMenu }) {
  const overlayRef = useRef();
  const menuRef = useRef();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClick = useCallback(
    (event) => {
      const menu = menuRef.current;
      if (!menu.contains(event.target)) {
        hideMenu();
      }
    },
    [hideMenu]
  );

  useEffect(() => {
    overlayRef.current.addEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div ref={overlayRef} className={className}>
      <motion.ul
        ref={menuRef}
        className="bg-white grow w-3/4 flex flex-col gap-6 px-4 py-6 rounded-r-lg"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={staggerVariants}
      >
        <motion.li>
          <Link to="/">
            <span className="font-extrabold text-3xl font-[Roboto]">
              Styles
              <span className="text-fuchsia-600 text-6xl leading-4 animate-pulse">
                .
              </span>
            </span>
          </Link>
        </motion.li>
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
    </div>
  );
}
