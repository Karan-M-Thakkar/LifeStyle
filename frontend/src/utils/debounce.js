export default function debounce(fnToDebounce, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fnToDebounce(...args), delay);
  };
}
