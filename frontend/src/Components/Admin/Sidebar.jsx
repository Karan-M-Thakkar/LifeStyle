import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <ul className="flex flex-col gap-8 text-sm">
        <li>
          <NavLink
            end
            to=""
            className="hover:underline underline-offset-8 decoration-fuchsia-600"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="flex flex-col">
          <NavLink
            to="products"
            className="hover:underline underline-offset-8 decoration-fuchsia-600"
          >
            Products
          </NavLink>
          <ul className="py-4 pl-8 flex flex-col gap-4">
            <li>
              <NavLink
                to="products"
                className="hover:underline underline-offset-8 decoration-fuchsia-600"
                end
              >
                List of Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products/add"
                className="hover:underline underline-offset-8 decoration-fuchsia-600"
              >
                Add a product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products/edit"
                className="hover:underline underline-offset-8 decoration-fuchsia-600"
              >
                Update a product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products/variants"
                className="hover:underline underline-offset-8 decoration-fuchsia-600"
              >
                Add or Remove Varinats
              </NavLink>
            </li>
            <li>
              <NavLink
                to="products/stock"
                className="hover:underline underline-offset-8 decoration-fuchsia-600"
              >
                Add or Modify Variant's Stock
              </NavLink>
            </li>
            <li>
              <NavLink to="products/images">Upload or Remove Images</NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="orders"
            className="hover:underline underline-offset-8 decoration-fuchsia-600"
          >
            Orders
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
