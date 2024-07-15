import { Link } from "react-router-dom";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import { useRef, useState } from "react";
import { GoPencil, GoPlus } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-toastify";
import Dropdown from "../Components/UI/Dropdown";
import Modal from "../Components/UI/Modal";
import { MdOutlineFileUpload } from "react-icons/md";

export default function AdminNewProductPage({ product }) {
  const formRef = useRef();
  const fileInputRef = useRef();

  const [imagesForDefaultSku, setImagesForDefaultSku] = useState([]);
  const [skuForImages, setSkuForImages] = useState("");

  const [previewImages, setPreviewImages] = useState([]);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);

  const [selectedColor, setSelectedColor] = useState({ hex: "", name: "" });
  const [colorVariants, setColorVariants] = useState([]);

  const [sizeVariant, setSizeVariant] = useState("");
  const [sizeVariants, setSizeVariants] = useState([]);

  const [variantStockInputs, setVariantStockInputs] = useState({});
  const [variants, setVariants] = useState([]);

  const getBrandAndTitle = () => {
    const formData = new FormData(formRef.current);
    const brand = formData.get("brand");
    const title = formData.get("title");

    return { brand, title };
  };

  const createSku = (brand, title, hex, size) => {
    let sku = `${brand}-${title}`;

    let colorObject = colorVariants.filter((variant) => variant.hex === hex)[0];

    if (colorObject) {
      sku += `-${colorObject.name}`;
    }

    if (size) {
      sku += `-${size}`;
    }

    return sku;
  };

  const updateSku = () => {
    const { brand, title } = getBrandAndTitle();

    if (brand && title) {
      if (variants.length > 0) {
        setVariants((prev) => [
          ...prev.map((variant) => {
            const { color, size: sizeVar } = variant;
            const { hex } = color;
            const { size } = sizeVar;

            const newSku = createSku(brand, title, hex, size);
            return { ...variant, sku: newSku };
          }),
        ]);
      }
    }
  };

  const addVariant = () => {
    const { brand, title } = getBrandAndTitle();

    if (!brand || !title) {
      toast.error(
        "Please add brand and/or title first, since it determines the SKU for the variant"
      );
      return;
    }

    const { color: hex, size, qoh, mrp, discount } = variantStockInputs;

    let isInvalidVariant = false;

    variants.map((variant) => {
      if (variant.sku === sku) {
        toast.error("Variants can't have same SKU");
        isInvalidVariant = true;
      }
    });

    const sku = createSku(brand, title, hex, size);

    if (sku && qoh && mrp && discount) {
      if (renderColourColumnInStockTable) {
        if (!hex) {
          isInvalidVariant = true;
        }
      }

      if (renderSizeColumnInStockTable) {
        if (!size) {
          isInvalidVariant = true;
        }
      }
    } else {
      isInvalidVariant = true;
    }

    if (!isInvalidVariant) {
      const newVariant = {
        ...variantStockInputs,
        sku,
      };

      if (colorObject) {
        newVariant.color = colorObject;
      }

      setVariants((prev) => [...prev, newVariant]);
    }
  };

  const handleChangeVariantStockInput = (prop, value) => {
    setVariantStockInputs((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const handleRemoveColorVariant = (hex) => {
    if (variants.length > 0) {
      const variantsWithColor = variants.filter(
        (variant) => variant.color.hex === hex
      );
      if (variantsWithColor.length > 0) {
        const response = window.confirm(
          `Some of the variants defined are dependent on the color, if you delete the variant, then all the relevant variants will be deleted and can't be reversed! Do you really want to proceed?`
        );

        if (response) {
          setColorVariants((prev) => prev.filter((color) => color.hex !== hex));
          setVariants((prev) =>
            prev.filter((variant) => variant.color.hex !== hex)
          );
        }
      }
    } else {
      setColorVariants((prev) => prev.filter((color) => color.hex !== hex));
    }
  };

  const handleAddColorClick = () => {
    const { hex, name } = selectedColor;
    if (hex && name) {
      setColorVariants((prev) => [...prev, { hex, name }]);
      setSelectedColor({ hex: "", name: "" });
    }
  };

  const handleAddSizeClick = () => {
    if (sizeVariant) {
      const allPossibleSizes = sizeVariant
        .trim()
        .split(",")
        .map((size) => ({ size: size.trim() }));
      setSizeVariants((prev) => [...prev, ...allPossibleSizes]);
      setSizeVariant("");
    }
  };

  const handleRemoveSizeVariant = (size) => {
    if (variants.length > 0) {
      const variantsWithSize = variants.filter(
        (variant) => variant.size === size
      );
      if (variantsWithSize.length > 0) {
        const response = window.confirm(
          `Some of the variants defined are dependent on the size '${size}', if you delete the variant, then all the relevant variants will be deleted and can't be reversed! Do you really want to proceed?`
        );

        if (response) {
          setVariants((prev) =>
            prev.filter((variant) => variant.size !== size)
          );
        }
      } else {
        setSizeVariants((prev) =>
          prev.filter(({ size: sizeVar }) => sizeVar !== size)
        );
      }
    } else {
      setSizeVariants((prev) =>
        prev.filter(({ size: sizeVar }) => sizeVar !== size)
      );
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      setPreviewImages((prev) => [...prev, ...files]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const productDetails = Object.fromEntries(formData.entries());
    console.log(productDetails);
  };

  const handleFilePicker = (sku) => {
    fileInputRef.current.click();
  };

  const addImages = () => {
    const images = previewImages;
    setPreviewImages([]);

    if (skuForImages) {
      setVariants((prev) => [
        ...prev.map((variant) => {
          if (variant.sku === skuForImages) {
            return {
              ...variant,
              images,
            };
          } else {
            return { ...variant };
          }
        }),
      ]);
    } else {
      setImagesForDefaultSku((prev) => [...prev, ...images]);
      setShowUploadImageModal(false);
    }
  };

  const handleUploadImageClick = (sku) => {
    setShowUploadImageModal(true);
    if (sku) {
      const targetVariant = variants.find((variant) => variant.sku === sku);
      const images = targetVariant?.images;
      if (images) {
        setPreviewImages(images);
      }
    } else {
      setPreviewImages(imagesForDefaultSku);
    }
  };

  const renderAddVariantsStockTable =
    colorVariants.length > 0 || sizeVariants.length > 0;
  const renderColourColumnInStockTable = colorVariants.length > 0;
  const renderSizeColumnInStockTable = sizeVariants.length > 0;

  return (
    <>
      {showUploadImageModal && (
        <Modal
          open={showUploadImageModal}
          onClose={() => setShowUploadImageModal(false)}
        >
          <ul className="flex gap-8 flex-wrap">
            {previewImages.map((img) => {
              const imgSrc = URL.createObjectURL(img);
              return (
                <li key={img.lastModified} className="relative">
                  <img src={imgSrc} className="w-24 aspect-auto" />
                  <Button
                    text
                    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  >
                    <IoMdCloseCircle
                      className=" text-fuchsia-500 text-2xl"
                      strokeWidth={2}
                    />
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="min-w-80 border-2 border-dashed rounded-lg border-slate-400 p-8 flex flex-col gap-8 justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleFileInputChange}
            />
            <p className="text-slate-400 text-sm">
              Please select images with .jpg, .jpeg or .png extensions
            </p>
            <Button text className="p-2" onClick={handleFilePicker}>
              Select file from device
            </Button>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button text onClick={() => setShowUploadImageModal(false)}>
              Close
            </Button>
            <Button onClick={addImages}>Done</Button>
          </div>
        </Modal>
      )}
      <section className="text-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold">New product</h2>
          <Link to="../" relative="path">
            <Button text>Back to All Products</Button>
          </Link>
        </div>
        <form
          className="flex flex-col gap-12"
          ref={formRef}
          onSubmit={handleFormSubmit}
        >
          <div className="flex gap-4">
            <Dropdown
              name="category"
              label="Category"
              options={categories}
              valueProperty="category"
              displayProperty="displayText"
            />
            <Input label="Brand" name="brand" onBlur={updateSku} />
            <Input label="Product Name" name="title" onBlur={updateSku} />
          </div>
          <Input label="Description" name="description" textarea />
          <div className="flex gap-8">
            <div className="w-1/2 flex flex-col gap-4 shadow-xl rounded-xl p-6">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    className="cursor-pointer"
                    value={selectedColor.hex}
                    onChange={(e) =>
                      setSelectedColor((prev) => ({
                        ...prev,
                        hex: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Give a name to selected color"
                    value={selectedColor.name}
                    onChange={(e) =>
                      setSelectedColor((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="p-1 border-2 border-fuchsia-600 rounded-full outline-none"
                    onClick={handleAddColorClick}
                  >
                    <GoPlus className="text-fuchsia-600" strokeWidth="2px" />
                  </button>
                </div>
                {colorVariants && colorVariants.length > 0 && (
                  <ul className="flex flex-wrap gap-6">
                    {colorVariants.map((color) => (
                      <li
                        key={color.hex + " " + color.name}
                        className="shadow-lg px-4 py-2 flex items-center gap-2 rounded-full"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span>{color.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColorVariant(color.hex)}
                        >
                          <MdOutlineClose />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-4 shadow-xl rounded-xl p-6">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 justify-between items-center">
                  <Input
                    placeholder="Add variant"
                    value={sizeVariant}
                    onChange={(e) => setSizeVariant(e.target.value)}
                  />
                  <button
                    type="button"
                    className="p-1 border-2 border-fuchsia-600 rounded-full outline-none"
                    onClick={handleAddSizeClick}
                  >
                    <GoPlus className="text-fuchsia-600" strokeWidth="2px" />
                  </button>
                </div>
                {sizeVariants && sizeVariants.length > 0 && (
                  <ul className="flex flex-wrap gap-6">
                    {sizeVariants.map(({ size }) => (
                      <li
                        key={size}
                        className="shadow-lg px-4 py-2 flex items-center gap-2 rounded-full"
                      >
                        <span>{size}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSizeVariant(size)}
                        >
                          <MdOutlineClose />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {!renderAddVariantsStockTable && (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <Input type="number" label="Stock/ QOH" name="qoh" />
                <Input type="number" label="MRP" name="mrp" />
                <Input type="number" label="Discount" name="discount" />
                <Button
                  outline
                  className="shrink-0"
                  onClick={() => handleUploadImageClick()}
                >
                  <MdOutlineFileUpload className="" /> Upload Images
                </Button>
              </div>
              <ul className="flex gap-8 flex-wrap">
                {imagesForDefaultSku.map((img) => {
                  const imgSrc = URL.createObjectURL(img);
                  return (
                    <li key={img.lastModified} className="relative">
                      <img src={imgSrc} className="w-24 aspect-auto" />
                      <button className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full hover:scale-110">
                        <IoMdCloseCircle
                          className=" text-fuchsia-500 text-2xl"
                          strokeWidth={2}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {renderAddVariantsStockTable && (
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Define Stock for Variants</p>
              <table>
                <thead>
                  <tr className="border-b-2 border-fuchsia-400">
                    <td className="p-2 w-1/5">SKU</td>
                    {renderColourColumnInStockTable && (
                      <td className="p-2 w-1/6">Color</td>
                    )}
                    {renderSizeColumnInStockTable && (
                      <td className="p-2 w-1/6">Size</td>
                    )}
                    <td className="p-2 w-1/6">Stock/ QOH</td>
                    <td className="p-2 w-1/6">MRP</td>
                    <td className="p-2 w-1/6">Discount</td>
                    <td className="p-2 w-1/12"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-fuchsia-200">
                    <td className="p-2"></td>
                    {renderColourColumnInStockTable && (
                      <td className="p-2">
                        <Dropdown
                          options={colorVariants}
                          valueProperty="hex"
                          displayProperty="name"
                          onChange={(e) =>
                            handleChangeVariantStockInput(
                              "color",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    )}
                    {renderSizeColumnInStockTable && (
                      <td className="p-2">
                        <Dropdown
                          options={sizeVariants}
                          valueProperty="size"
                          displayProperty="size"
                          onChange={(e) =>
                            handleChangeVariantStockInput(
                              "size",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    )}
                    <td className="p-2">
                      <Input
                        type="number"
                        value={variantStockInputs.qoh}
                        onChange={(e) =>
                          handleChangeVariantStockInput("qoh", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={variantStockInputs.mrp}
                        onChange={(e) =>
                          handleChangeVariantStockInput("mrp", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={variantStockInputs.discount}
                        onChange={(e) =>
                          handleChangeVariantStockInput(
                            "discount",
                            e.target.value
                          )
                        }
                        step={1}
                        max={99.99}
                      />
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="p-1 border-2 border-fuchsia-600 rounded-full outline-none cursor-pointer"
                        onClick={addVariant}
                      >
                        <GoPlus
                          className="text-fuchsia-600"
                          strokeWidth="2px"
                        />
                      </button>
                    </td>
                  </tr>
                  {variants.map((variant) => {
                    const { sku, color, size, qoh, mrp, discount } = variant;
                    const { hex, name } = color;
                    return (
                      <tr key={sku} className="border-b-2 border-fuchsia-200">
                        <td className="p-2">{sku}</td>
                        {renderColourColumnInStockTable && (
                          <td className="p-2 flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: hex }}
                            ></div>
                            <span>{name}</span>
                          </td>
                        )}
                        {renderSizeColumnInStockTable && (
                          <td className="p-2">{size}</td>
                        )}
                        <td className="p-2">{qoh}</td>
                        <td className="p-2">{mrp}</td>
                        <td className="p-2">{discount}</td>
                        <td className="p-2">
                          <button
                            type="button"
                            className="p-1 border-2 border-fuchsia-600 rounded-full outline-none cursor-pointer"
                            onClick={() => {}}
                          >
                            <GoPencil
                              className="text-fuchsia-600"
                              strokeWidth="2px"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
