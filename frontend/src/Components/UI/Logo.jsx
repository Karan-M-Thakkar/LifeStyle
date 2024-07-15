export default function Logo({ className }) {
  let baseClass =
    "font-bold text-3xl font-[Poppins] flex items-center gap-1 text-gray-700";

  if (className) {
    baseClass += ` ${className}`;
  }

  return (
    <p className={baseClass}>
      <span className="text-fuchsia-800 font-[caveat]">Life</span>
      <span className="font-semibold">Style</span>
    </p>
  );
}
