export default function CheckboxInput({ name, label, value, ...others }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        name={name}
        id={value || name}
        value={value || undefined}
        {...others}
        className="accent-fuchsia-500 cursor-pointer"
      />
      <label htmlFor={value || name} className="cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}
