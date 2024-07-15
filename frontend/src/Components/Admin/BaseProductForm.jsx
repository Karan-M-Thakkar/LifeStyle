import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useFetchCategoryTree from "../../Hooks/useFetchCategoryTree";
import { http } from "../../utils/apis";
import Button from "../UI/Button";
import CheckboxInput from "../UI/CheckboxInput";
import Input from "../UI/Input";
import Loader from "../UI/Loader";
import CategoryCombos from "./CategoryCombos";

export default function BaseProductForm({ product }) {
  const formRef = useRef();

  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const { isLoading, data, isError, error, refetch } = useFetchCategoryTree();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) =>
      http({ method: "POST", endPointPath: "/product", payload }),
    onSuccess: (data) => {
      handleFormReset();
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

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

  const handleFormReset = () => {
    setShowGenderOptions(false);
    formRef.current.reset();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const gender = formData.getAll("gender");
    const isGenderSpecific = Boolean(formData.get("isGenderSpecific"));

    const productData = {
      ...Object.fromEntries(formData.entries()),
      gender,
      isGenderSpecific,
    };

    const {
      categoryId,
      subCategoryId,
      subCategoryItemId,
      brand,
      title,
      description,
    } = productData;

    if (
      !categoryId ||
      !subCategoryId ||
      !subCategoryItemId ||
      !brand ||
      !title ||
      !description ||
      isGenderSpecific === undefined ||
      (isGenderSpecific && gender.length === 0)
    ) {
      return toast.error("All the fields are mandatory");
    }

    mutate(productData);
  };

  return (
    <AnimatePresence>
      <motion.form
        className="flex flex-col gap-6"
        ref={formRef}
        onSubmit={handleSubmitForm}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-8">
          <div className="w-3/4">
            <CategoryCombos categories={categories} />
          </div>
          <Input name="brand" label="Brand" className="w-1/4" />
        </div>
        <div className="flex gap-8">
          <Input className="w-2/5" name="title" label="Product Name" />
          <Input
            className="w-3/5"
            name="description"
            label="Description"
            textarea
          />
        </div>
        <div className="flex flex-col gap-4">
          <CheckboxInput
            name="isGenderSpecific"
            label="Is Gender specific?"
            value="genderSpecific"
            onChange={(e) => setShowGenderOptions(e.target.checked)}
          />
          <AnimatePresence>
            {showGenderOptions && (
              <motion.div
                className="flex items-center gap-8 border-2 border-fuchsia-100 p-4 rounded-lg self-start"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <CheckboxInput name="gender" label="Male" value="male" />
                <CheckboxInput name="gender" label="Female" value="female" />
                <CheckboxInput name="gender" label="Unisex" value="unisex" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="self-end flex items-center gap-6">
          {!product && (
            <Button text onClick={handleFormReset} type="button">
              Reset
            </Button>
          )}
          {product && (
            <Button text type="button">
              Cancel
            </Button>
          )}
          {!product && (
            <Button
              showLoader={isPending}
              loaderClass="w-4 border-2 border-white"
            >
              Save
            </Button>
          )}
          {product && <Button>Update</Button>}
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
