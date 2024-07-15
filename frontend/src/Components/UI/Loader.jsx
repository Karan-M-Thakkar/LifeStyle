export default function Loader({ loaderClass }) {
  return <div className={`loader ${loaderClass ? loaderClass : ""}`}></div>;
}
