/* const items = [
  "Accessories",
  "Active Pants",
  "Activewear",
  "Analog",
  "Aviator",
  "Backpacks",
  "Bags & Backpacks",
  "Baseball Caps",
  "Bath Mats",
  "Bathrobes",
  "Beanies",
  "Bed Sheets",
  "Belts",
  "Boots",
  "Boys Clothing",
  "Bracelets",
  "Brushes & Applicators",
  "Candles & Fragrances",
  "Casual Shoes",
  "Cleansers",
  "Clothing",
  "Clutches",
  "Coats & Jackets",
  "Comforters & Quilts",
  "Crossbody Bags",
  "Cufflinks",
  "Curtains",
  "Cushions & Covers",
  "Deodorant",
  "Digital",
  "Dresses",
  "Duffle Bags",
  "Earrings",
  "Eyes",
  "Fabric Belts",
  "Face",
  "Fashion Gloves",
  "Flats",
  "Footwear",
  "Formal Shoes",
  "Girls Clothing",
  "Gloves",
  "Hair Tools",
  "Hair Treatments",
  "Handbags",
  "Hats",
  "Hats & Caps",
  "Heels",
  "Hiking Shoes",
  "Jackets",
  "Jackets & Coats",
  "Jeans",
  "Jewelry",
  "Laptop Bags",
  "Leather Belts",
  "Leggings",
  "Lingerie & Sleepwear",
  "Lips",
  "Masks",
  "Messenger Bags",
  "Mirrors",
  "Moisturizers",
  "Nails",
  "Necklaces",
  "Perfume",
  "Pillow Cases",
  "Rings",
  "Round",
  "Rugs",
  "Running Shoes",
  "Sandals",
  "Sandals & Flip Flops",
  "Scarves",
  "Scarves & Gloves",
  "Shampoo & Conditioner",
  "Shirts",
  "Shorts",
  "Silk Scarves",
  "Skirts",
  "Smartwatches",
  "Sneakers",
  "Sport",
  "Sports Bras",
  "Sports Sandals",
  "Sports Shoes",
  "Styling Products",
  "Suits",
  "Sun Hats",
  "Sunglasses",
  "Sweaters & Cardigans",
  "Swimwear",
  "T-Shirts",
  "Ties & Bow Ties",
  "Tops & Blouses",
  "Tops & T-Shirts",
  "Tote Bags",
  "Towels",
  "Tracksuits",
  "Training Shoes",
  "Treatments & Serums",
  "Trousers",
  "Underwear",
  "Wall Art",
  "Wallets",
  "Watches",
  "Wayfarer",
  "Winter Gloves",
  "Wool Scarves",
];

const response = await SubCategoryItem.create(
  ...items.map((item) => ({ item }))
);

console.log(`Items added: ${response.length}}`); */

/* const subCategoriesWithChildren = [
  {
    name: "Clothing",
    items: [
      "Tops & Blouses",
      "Shirts",
      "Skirts",
      "Jackets & Coats",
      "Underwear",
      "Trousers",
      "Suits",
      "Sweaters & Cardigans",
      "Swimwear",
      "Activewear",
      "Coats & Jackets",
      "T-Shirts",
      "Dresses",
      "Lingerie & Sleepwear",
      "Shorts",
      "Jeans",
    ],
  },
  {
    name: "Footwear",
    items: [
      "Hiking Shoes",
      "Formal Shoes",
      "Flats",
      "Heels",
      "Training Shoes",
      "Sandals & Flip Flops",
      "Sandals",
      "Boots",
      "Casual Shoes",
      "Sports Sandals",
      "Sneakers",
      "Sports Shoes",
      "Running Shoes",
    ],
  },
  {
    name: "Accessories",
    items: [
      "Cufflinks",
      "Gloves",
      "Hats",
      "Jewelry",
      "Hats & Caps",
      "Scarves & Gloves",
      "Belts",
      "Ties & Bow Ties",
      "Sunglasses",
      "Wallets",
      "Scarves",
      "Watches",
      "Bags & Backpacks",
    ],
  },
  {
    name: "Bags",
    items: [
      "Messenger Bags",
      "Crossbody Bags",
      "Laptop Bags",
      "Handbags",
      "Clutches",
      "Duffle Bags",
      "Backpacks",
      "Tote Bags",
      "Wallets",
    ],
  },
  {
    name: "Boys Clothing",
    items: [
      "Shirts",
      "Jackets & Coats",
      "Trousers",
      "Swimwear",
      "Activewear",
      "T-Shirts",
      "Shorts",
      "Jeans",
    ],
  },
  {
    name: "Girls Clothing",
    items: [
      "Skirts",
      "Jackets & Coats",
      "Swimwear",
      "Activewear",
      "Dresses",
      "Shorts",
      "Tops & T-Shirts",
      "Jeans",
    ],
  },
  {
    name: "Makeup",
    items: ["Lips", "Nails", "Face", "Eyes"],
  },
  {
    name: "Skincare",
    items: ["Masks", "Moisturizers", "Treatments & Serums", "Cleansers"],
  },
  {
    name: "Hair Care",
    items: ["Shampoo & Conditioner", "Hair Treatments", "Styling Products"],
  },
  {
    name: "Fragrances",
    items: ["Deodorant", "Perfume"],
  },
  {
    name: "Tools & Accessories",
    items: ["Hair Tools", "Brushes & Applicators", "Mirrors"],
  },
  {
    name: "Men",
    items: [
      "Tracksuits",
      "Swimwear",
      "Jackets",
      "T-Shirts",
      "Active Pants",
      "Shorts",
    ],
  },
  {
    name: "Women",
    items: [
      "Swimwear",
      "Jackets",
      "T-Shirts",
      "Leggings",
      "Sports Bras",
      "Shorts",
    ],
  },
  {
    name: "Jewelry",
    items: ["Necklaces", "Rings", "Earrings", "Bracelets"],
  },
  {
    name: "Watches",
    items: ["Smartwatches", "Analog", "Digital"],
  },
  {
    name: "Sunglasses",
    items: ["Aviator", "Wayfarer", "Round", "Sport"],
  },
  {
    name: "Hats & Caps",
    items: ["Sun Hats", "Baseball Caps", "Beanies"],
  },
  {
    name: "Belts & Wallets",
    items: ["Fabric Belts", "Wallets", "Leather Belts"],
  },
  {
    name: "Scarves & Gloves",
    items: ["Silk Scarves", "Wool Scarves", "Fashion Gloves", "Winter Gloves"],
  },
  {
    name: "Bedding",
    items: ["Pillow Cases", "Bed Sheets", "Comforters & Quilts"],
  },
  {
    name: "Bath",
    items: ["Bathrobes", "Towels", "Bath Mats"],
  },
  {
    name: "Home Decor",
    items: [
      "Wall Art",
      "Cushions & Covers",
      "Curtains",
      "Rugs",
      "Candles & Fragrances",
    ],
  },
];

const getSubCItemsIds = async (items) => {
  const subCItems = await SubCategoryItem.find({ item: { $in: items } });
  return subCItems.map((subC) => subC._id);
};

const insertSubC = async () => {
  try {
    const promisesArray = [];
    subCategoriesWithChildren.map((subC, index) => {
      promisesArray.push(getSubCItemsIds(subC.items));
    });

    const idsArr = await Promise.all(promisesArray);

    const insertableSubCs = subCategoriesWithChildren.map((subC, index) => ({
      subCategory: subC.name,
      subCategoryItems: idsArr[index],
    }));

    const subCs = await SubCategory.create(...insertableSubCs);

    console.log(subCs, subCs.length);
  } catch (e) {
    console.log(e.message);
  }
};

insertSubC(); */

/* const categoriesWithChildren = [
  {
    name: "Men",
    subCategories: ["Clothing", "Footwear", "Accessories", "Bags"],
  },
  {
    name: "Women",
    subCategories: ["Clothing", "Footwear", "Accessories", "Bags"],
  },
  {
    name: "Kids",
    subCategories: [
      "Boys Clothing",
      "Girls Clothing",
      "Footwear",
      "Accessories",
    ],
  },
  {
    name: "Beauty & Personal Care",
    subCategories: [
      "Makeup",
      "Skincare",
      "Hair Care",
      "Fragrances",
      "Tools & Accessories",
    ],
  },
  {
    name: "Sports & Activewear",
    subCategories: ["Men", "Women", "Footwear"],
  },
  {
    name: "Accessories",
    subCategories: [
      "Jewelry",
      "Watches",
      "Sunglasses",
      "Hats & Caps",
      "Belts & Wallets",
      "Scarves & Gloves",
    ],
  },
  {
    name: "Home & Living",
    subCategories: ["Bedding", "Bath", "Home Decor"],
  },
];

const insertCs = async () => {
  try {
    const subCIds = await Promise.all(
      categoriesWithChildren.map((c) =>
        SubCategory.find({ subCategory: { $in: c.subCategories } })
      )
    );

    const insertableCs = categoriesWithChildren.map((c, index) => ({
      category: c.name,
      subCategories: subCIds[index],
    }));

    const insertedCs = await Category.create(...insertableCs);
    console.log(insertedCs, insertedCs.length);
  } catch (e) {
    console.log(e.message);
  }
};

insertCs(); */

/* try {
  const updatedSubCs = await SubCategory.updateMany(
    {},
    {
      $rename: {
        subCategoryItemId: "subCategoryItemIds",
      },
    }
  );

  console.log(updatedSubCs.length);
} catch (e) {
  console.log(e.message);
} */
