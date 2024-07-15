import { useRef, useState } from "react";
import Dropdown from "../UI/Dropdown";

const CategoryCombos = function CategoryCombos({
  categories,
  cId,
  subCId,
  subCItemId,
  onChangeCId,
  onChangeSubCId,
  onChangeSubCItemId,
}) {
  /* const categoryRef = useRef();
  const subCategoryRef = useRef();
  const subCategoryItemRef = useRef(); */

  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryItems, setSubCategoryItems] = useState([]);

  /* useImperativeHandle(ref, () => {
    return {
      getCategoryIds: () => {
        return {
          categoryId: categoryRef.current?.value,
          subCategoryId: subCategoryRef.current?.value,
          subCategoryItemId: subCategoryItemRef.current?.value,
        };
      },
    };
  }); */

  const handleCategoryChange = (e) => {
    const cId = e.target.value;
    if (cId) {
      const subCs = categories.find(
        (category) => category._id === cId
      ).subCategories;
      setSubCategories(subCs);
      if (onChangeCId) {
        onChangeCId(cId);
      }
    } else {
      setSubCategories([]);
      setSubCategoryItems([]);
    }
  };

  const handleSubCategoryChange = (e) => {
    const subCId = e.target.value;
    if (subCId) {
      const subCItems = subCategories.find(
        (subC) => subC._id === subCId
      ).subCategoryItems;
      setSubCategoryItems(subCItems);
      if (onChangeSubCId) {
        onChangeSubCId(subCId);
      }
    } else {
      setSubCategoryItems([]);
    }
  };

  const handleSubCategoryItemChange = (e) => {
    const subCItemId = e.target.value;
    if (subCItemId && onChangeSubCItemId) {
      onChangeSubCItemId(subCItemId);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <Dropdown
        name="categoryId"
        label="Category"
        options={categories}
        className="w-1/3"
        valueProperty="_id"
        displayProperty="category"
        onChange={handleCategoryChange}
      />
      <Dropdown
        name="subCategoryId"
        label="Sub-Category"
        options={subCategories}
        className="w-1/3"
        valueProperty="_id"
        displayProperty="subCategory"
        disabled={subCategories.length === 0}
        onChange={handleSubCategoryChange}
      />
      <Dropdown
        name="subCategoryItemId"
        label="Sub-Category Item"
        options={subCategoryItems}
        valueProperty="_id"
        displayProperty="item"
        className="w-1/3"
        disabled={subCategoryItems.length === 0}
        onChange={handleSubCategoryItemChange}
      />
    </div>
  );
};

export default CategoryCombos;
