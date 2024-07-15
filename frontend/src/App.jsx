import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import AdminDashboardPage from "./Pages/Admin/DashboardPage.jsx";
import EditProductPage from "./Pages/Admin/EditProductPage.jsx";
import AdminNewProductPage from "./Pages/Admin/NewProductPage.jsx";
import AdminOrdersPage from "./Pages/Admin/OrdersListPage.jsx";
import AdminProductsPage from "./Pages/Admin/ProductsListPage.jsx";
import AuthPage from "./Pages/AuthPage.jsx";
import Homepage from "./Pages/Homepage.jsx";
import { authActions } from "./Store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/add",
        element: <AdminNewProductPage />,
      },
      {
        path: "products/edit",
        element: <EditProductPage />,
      },
      {
        path: "orders",
        element: <AdminOrdersPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onlineHandler = () => {
      dispatch(authActions.setOnlineStatus(navigator.onLine));
    };
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", onlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", onlineHandler);
    };
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId="525581460156-s5b9irmefgeh1nn3jae3dknb3ef5fh04.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <ToastContainer theme="colored" />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
