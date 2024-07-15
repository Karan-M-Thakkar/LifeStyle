export default function FooterSection({ heading, className, children }) {
  let baseClass = "max-w-64 text-sm";

  if (className) {
    baseClass += ` ${className}}`;
  }

  return (
    <section className={baseClass}>
      <h2 className="text-xl font-semibold text-fuchsia-800 mb-6">{heading}</h2>
      {children}
    </section>
  );
}
