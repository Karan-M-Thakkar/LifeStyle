import { motion } from "framer-motion";
import { forwardRef } from "react";

const ValidationErrorMsg = ({ message, className }) => (
  <p className={`text-red-500 font-[Roboto] text-sm ${className}`}>{message}</p>
);

const Input = forwardRef(function Input(
  {
    label,
    name,
    invalid,
    className,
    highlightError,
    disabled,
    textarea,
    ...others
  },
  ref
) {
  let wrapperBaseClass = "flex flex-col items-start gap-2";

  if (className) {
    wrapperBaseClass = wrapperBaseClass + " " + className;
  }

  return (
    <div className={wrapperBaseClass}>
      {label && (
        <label htmlFor={name} className="text-xs font-medium">
          {label}
        </label>
      )}
      {!textarea ? (
        <motion.input
          whileFocus={{
            scaleY: 1.02,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
          {...others}
          id={name}
          name={name}
          className={`w-full px-4 py-2 outline-none rounded border-2 text-sm ${
            invalid || highlightError ? "border-red-600" : "border-fuchsia-100"
          } focus:border-fuchsia-300 font-[Roboto] ${
            disabled ? "bg-slate-200 cursor-not-allowed" : "bg-white"
          }`}
          ref={ref}
          disabled={disabled}
        />
      ) : (
        <motion.textarea
          whileFocus={{
            scaleY: 1.02,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
          {...others}
          id={name}
          name={name}
          className={`w-full px-4 py-2 outline-none rounded border-2 text-sm ${
            invalid || highlightError ? "border-red-600" : "border-fuchsia-100"
          } focus:border-fuchsia-300 font-[Roboto] ${
            disabled ? "bg-slate-200 cursor-not-allowed" : "bg-white"
          }`}
          ref={ref}
          rows={3}
          disabled={disabled}
        />
      )}

      {invalid && <ValidationErrorMsg message={invalid} />}
    </div>
  );
});

export default Input;
