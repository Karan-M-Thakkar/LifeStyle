import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Typeahead({
  fetchSuggestions,
  queryKey,
  noResultsText,
  ...others
}) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    let timerId = setTimeout(() => setDebouncedInput(input), 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [input]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["search", { searchTerm: debouncedInput }, ...queryKey],
    queryFn: ({ signal }) => fetchSuggestions(debouncedInput, signal),
    enabled: debouncedInput !== "",
    retry: false,
  });

  return (
    <div className="relative">
      <input
        className="w-full px-4 py-2 outline-none rounded border-2 border-fuchsia-100 text-sm focus:border-fuchsia-300 font-[Roboto] peer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        {...others}
      />
      {input && (isLoading || (data && data.length === 0)) && (
        <div className="absolute top-[110%] border-2 border-fuchsia-100 w-full h-20 rounded-md shadow-xl hidden peer-focus:flex flex-col justify-center items-center">
          {isLoading && (
            <Loader loaderClass="w-6 border-2 border-fuchsia-600" />
          )}
          {data && data.length === 0 && (
            <p className="text-sm text-slate-400">{noResultsText}</p>
          )}
        </div>
      )}
      {data && data.length > 0 && (
        <ul className="absolute top-[110%] border-2 border-fuchsia-100 w-full min-h-20 max-h-80 rounded-md shadow-xl hidden peer-focus:flex flex-col">
          {data.map((product) => {
            return (
              <li
                key={product._id}
                className="text-sm text-slate-500 px-4 py-2"
              >
                {product.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
