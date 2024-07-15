import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const ValidationErrorMsg = ({ message, className }) => (
  <p className={`text-red-500 mb-4 font-[Roboto] text-sm ${className}`}>
    {message}
  </p>
);

export default function PasswordInput({
  label,
  name,
  toggleable,
  invalid,
  ...others
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => setPasswordVisible((prev) => !prev);

  return (
    <div className="w-full flex flex-col items-start gap-2 mb-4">
      <label htmlFor={name} className="text-xs font-medium">
        {label}
      </label>
      <div className="bg-fuchsia-50 flex w-full items-center">
        <motion.input
          {...others}
          whileFocus={{
            scaleY: 1.02,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
          type={passwordVisible ? "text" : "password"}
          id={name}
          name={name}
          className={`w-full px-4 py-2 bg-white outline-none rounded border-2 ${
            invalid ? "border-red-600" : "border-fuchsia-100"
          } focus:border-fuchsia-300 font-[Roboto]`}
        />
        <motion.button
          type="button"
          className="px-4"
          onClick={handleClick}
          whileTap={{ scale: 2 }}
        >
          {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
        </motion.button>
      </div>
      {invalid && <ValidationErrorMsg message={invalid} />}
    </div>
  );
}
