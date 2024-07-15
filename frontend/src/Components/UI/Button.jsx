import Loader from "./Loader";
import { motion } from "framer-motion";

export default function Button({
  outline,
  className,
  text,
  children,
  showLoader,
  loaderClass,
  ...others
}) {
  let baseClass =
    "rounded-md text-sm font-[Poppins] flex justify-center items-center gap-2 text-center";

  if (outline) {
    baseClass +=
      " py-2 px-4 border-2 border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50";
  }

  if (text) {
    baseClass += " text-fuchsia-600";
  }

  if (!outline && !text) {
    baseClass +=
      " py-2 px-4 border-2 border-fuchsia-700 bg-fuchsia-600 text-white hover:bg-fuchsia-700 hover:shadow-lg transition-colors";
  }

  baseClass += ` ${className ? className : ""}`;

  return (
    <motion.button className={baseClass} {...others}>
      {children}
      {showLoader && <Loader loaderClass={loaderClass} />}
    </motion.button>
  );
}
