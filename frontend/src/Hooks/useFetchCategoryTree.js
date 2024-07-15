import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/apis";

export default function useFetchCategoryTree() {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["category-tree"],
    queryFn: ({ signal }) =>
      http({ method: "GET", endPointPath: "/utils/get-category-tree", signal }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, isError, error, refetch };
}
