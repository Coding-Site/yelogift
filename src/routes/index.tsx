/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const App = lazy(() => import("../App"));
const AdminLayout = lazy(() => import("../admin/AdminLayout"));
const Home = lazy(() => import("../pages/Home/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Checkout = lazy(() => import("../pages/Checkout"));
const PaymentManual = lazy(() => import("../pages/PaymentManual"));
const PaymentAuto = lazy(() => import("../pages/PaymentAuto"));
const UserOrderDetails = lazy(() => import("../pages/UserOrderDetails"));
const UserOrders = lazy(() => import("../pages/UserOrders"));
const AdminHome = lazy(() => import("../admin/AdminHome/AdminHome"));
const AdminLogin = lazy(() => import("../admin/AdminLogin"));

// Setting Pages
const Settings = lazy(() => import("../admin/Settings/Settings"));
const Products = lazy(() => import("../admin/MyShop/Products/Products"));
const AddProduct = lazy(() => import("../admin/MyShop/Products/AddProduct"));
const Codes = lazy(() => import("../admin/MyShop/Products/Codes"));
const Orders = lazy(() => import("../admin/MyShop/Orders/Orders"));
const OrderDetails = lazy(() => import("../admin/MyShop/Orders/OrderDetails"));
const Customers = lazy(() => import("../admin/MyShop/Customers/Customers"));
const Category = lazy(() => import("../admin/MyShop/Category/Category"));
const AddCategory = lazy(() => import("../admin/MyShop/Category/AddCategory"));

// Site Settings Pages
const SiteSetting = lazy(
  () => import("../admin/Settings/SiteSetting/SiteSetting")
);
const Social = lazy(() => import("../admin/Settings/Social/Social"));
const Slider = lazy(() => import("../admin/Settings/Slider/Slider"));
const Video = lazy(() => import("../admin/Settings/Video/Video"));
const Footer = lazy(() => import("../admin/Settings/Footer/Footer"));

// Other Pages
const Currency = lazy(() => import("../admin/Currency/Currency"));
const Notification = lazy(() => import("../admin/Notification/Notification"));
const CustomPage = lazy(() => import("../admin/CustomPage/CustomPage"));

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "category",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleProduct />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "paymentmanual",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentManual />
          </Suspense>
        ),
      },
      {
        path: "paymentauto",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PaymentAuto />
          </Suspense>
        ),
      },
      {
        path: "userorderdetails",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserOrderDetails />
          </Suspense>
        ),
      },
      {
        path: "userorders",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserOrders />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminHome />
          </Suspense>
        ),
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Products />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddProduct />
              </Suspense>
            ),
          },
          {
            path: "codes",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Codes />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Orders />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <OrderDetails />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "customers",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Customers />
          </Suspense>
        ),
      },
      {
        path: "category",
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Category />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddCategory />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </Suspense>
        ),
        children: [
          {
            path: "site-setting",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SiteSetting />
              </Suspense>
            ),
          },
          {
            path: "social",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Social />
              </Suspense>
            ),
          },
          {
            path: "slider",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Slider />
              </Suspense>
            ),
          },
          {
            path: "video",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Video />
              </Suspense>
            ),
          },
          {
            path: "footer",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Footer />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "currency",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Currency />
          </Suspense>
        ),
      },
      {
        path: "custom-page",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CustomPage />
          </Suspense>
        ),
      },
      {
        path: "notification",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Notification />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "admin/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLogin />
      </Suspense>
    ),
  },
]);
