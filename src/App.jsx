
import MainPage from "./pages/MainPage";
import ErrorPage from './pages/ErrorPage';
// import LoginPage from "./pages/LoginPage";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import DashboardPage from "./pages/admin/DashboardPage";
import CategoryPage from "./pages/admin/setting/CategoryPage";
import SettingPage from "./pages/admin/SettingPage";
import ShopPage from "./pages/admin/ShopPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./features/utils/ProtectedRoute";
import SubcategoryPage from "./pages/admin/setting/SubcategoryPage";
import ColorPage from "./pages/admin/setting/ColorPage";
import UnitPage from "./pages/admin/setting/UnitPage";
import SizePage from "./pages/admin/setting/SizePage";
import ProvincePage from "./pages/admin/setting/ProvincePage";
import CityPage from "./pages/admin/setting/CityPage";
import ProductPage from "./pages/admin/shop/ProductPage";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <DashboardPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            path: "category",
            element: <CategoryPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "subcategory",
            element: <SubcategoryPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "color",
            element: <ColorPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "size",
            element: <SizePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "unit",
            element: <UnitPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "province",
            element: <ProvincePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "city",
            element: <CityPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "sale",
            element: <h1>Penjualan</h1>,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "shop",
        element: <ShopPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            path: "product",
            element: <ProductPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "order",
            element: <h1>Pesanan</h1>,
            errorElement: <ErrorPage />,
          },
          {
            path: "product-review",
            element: <h1>Ulasan Produk</h1>,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "users",
        element: <h1>Pengguna</h1>,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
];

const App = () => {
  const router = createBrowserRouter(routes)

  return (
    <RouterProvider router={router} />
  );
};
export default App;
