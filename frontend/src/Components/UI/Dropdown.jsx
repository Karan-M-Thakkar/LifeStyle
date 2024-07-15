import { forwardRef } from "react";

const Dropdown = forwardRef(function Dropdown(
  {
    className,
    name,
    label,
    options,
    valueProperty,
    displayProperty,
    disabled,
    ...others
  },
  ref
) {
  let wrapperBaseClass = "flex flex-col gap-2 text-sm";

  if (className) {
    wrapperBaseClass = className + " " + wrapperBaseClass;
  }

  return (
    <div className={wrapperBaseClass}>
      {label && (
        <label htmlFor={name} className="text-xs font-medium">
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
        {...others}
        className={`px-4 py-2 border-2 border-fuchsia-100 rounded outline-none ${
          disabled ? "bg-slate-200 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={disabled}
        ref={ref}
      >
        <option value="">select</option>
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[displayProperty]}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Dropdown;
