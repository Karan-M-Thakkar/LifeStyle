import { AnimatePresence, motion } from "framer-motion";
import CategoryCombos from "../../Components/Admin/CategoryCombos";
import Button from "../../Components/UI/Button";
import Loader from "../../Components/UI/Loader";
import Typeahead from "../../Components/UI/Typeahead";
import useFetchCategoryTree from "../../Hooks/useFetchCategoryTree";
import { http } from "../../utils/apis";
import { useState } from "react";

export default function EditProductPage() {
  const { isLoading, data, isError, error, refetch } = useFetchCategoryTree();

  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [subCategoryItemId, setSubCategoryItemId] = useState();

  const fetchProducts = async (searchTerm, signal) => {
    let queryParams = "?";
    if (searchTerm) {
      queryParams += `term=${searchTerm}`;
    }
    if (categoryId) {
      queryParams += `&category=${categoryId}`;
    }

    if (subCategoryId) {
      queryParams += `&subCategoryId=${subCategoryId}`;
    }

    if (subCategoryItemId) {
      queryParams += `&subCategoryItemId=${subCategoryItemId}`;
    }
    const data = await http({
      method: "GET",
      endPointPath: `/product/search${queryParams}`,
      signal,
    });

    return data.products;
  };

  if (isLoading) {
    return (
      <div className="grow flex justify-center items-center">
        <Loader loaderClass="w-8 border-2 border-fuchsia-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grow flex flex-col gap-8 justify-center items-center">
        <p>{error.message || "Something went Wrong!"}</p>
        <Button outline onClick={() => refetch({ throwOnError: true })}>
          Retry
        </Button>
      </div>
    );
  }

  const { categories } = data;

  const queryKey = [
    "product-search",
    { cId: categoryId, subC: subCategoryId, subCItemId: subCategoryItemId },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="flex-grow flex flex-col gap-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-8">
          <div className="w-3/4">
            <CategoryCombos
              categories={categories}
              fetchSuggestions={fetchProducts}
              onChangeCId={(id) => setCategoryId(id)}
              onChangeSubCId={(id) => setSubCategoryId(id)}
              onChangeSubCItemId={(id) => setSubCategoryItemId(id)}
            />
          </div>
          <div className="flex flex-col justify-end w-1/4">
            <Typeahead
              placeholder="search a product"
              fetchSuggestions={fetchProducts}
              queryKey={queryKey}
              noResultsText="No products found."
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
