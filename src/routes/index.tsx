/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {  createHashRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "../utils/Spinner";

const App = lazy(() => import("../App"));
const AdminLayout = lazy(() => import("../admin/AdminLayout"));
const Home = lazy(() => import("../pages/Home/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const CategoryFeed = lazy(() => import("../pages/Category/Category"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Checkout = lazy(() => import("../pages/Checkout"));
const PaymentManual = lazy(() => import("../pages/PaymentManual"));
const PaymentAuto = lazy(() => import("../pages/PaymentAuto"));
const UserOrderDetails = lazy(() => import("../pages/UserOrderDetails"));
const UserOrders = lazy(() => import("../pages/UserOrders"));
const OrdersHistory = lazy(() => import("../pages/OrdersHistory"));
const Signin = lazy(() => import("../pages/Signin"));
const Signup = lazy(() => import("../pages/SignUp"));
const AdminHome = lazy(() => import("../admin/AdminHome/AdminHome"));
const AdminLogin = lazy(() => import("../admin/AdminLogin"));

// Setting Pages
const Settings = lazy(() => import("../admin/Settings/Settings"));
const Products = lazy(() => import("../admin/MyShop/Products/Products"));
const Parts = lazy(() => import("../admin/MyShop/Parts/Parts"));
const AddPart = lazy(() => import("../admin/MyShop/Parts/AddPart"));
const EditPart = lazy(() => import("../admin/MyShop/Parts/EditPart"));
const AddProduct = lazy(() => import("../admin/MyShop/Products/AddProduct"));
const EditProduct = lazy(() => import("../admin/MyShop/Products/EditProduct"));
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
const AddSocial = lazy(() => import("../admin/Settings/Social/AddSocial"));
const EditSocial = lazy(() => import("../admin/Settings/Social/EditSocial"));
const Slider = lazy(() => import("../admin/Settings/Slider/Slider"));
const AddSlider = lazy(() => import("../admin/Settings/Slider/AddSlider"));
const EditSlider = lazy(() => import("../admin/Settings/Slider/EditSlider"));
const Video = lazy(() => import("../admin/Settings/Video/Video"));
const Footer = lazy(() => import("../admin/Settings/Footer/Footer"));

// Other Pages
const Currency = lazy(() => import("../admin/Currency/Currency"));
const Notification = lazy(() => import("../admin/Notification/Notification"));
const AddNotification = lazy(
  () => import("../admin/Notification/AddNotification")
);
const CustomPage = lazy(() => import("../admin/CustomPage/CustomPage"));
const AddPage = lazy(() => import("../admin/CustomPage/AddPage"));
const Main = lazy(() => import("./Main"));

export const router = createHashRouter([
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "categories",
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Categories />
                  </Suspense>
                ),
              },
              {
                path: ":categoryId",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <CategoryFeed />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "product/:id",
            element: (
              <Suspense fallback={<Spinner />}>
                <SingleProduct />
              </Suspense>
            ),
          },
          {
            path: "checkout",
            element: (
              <Suspense fallback={<Spinner />}>
                <Checkout />
              </Suspense>
            ),
          },
          {
            path: "paymentmanual",
            element: (
              <Suspense fallback={<Spinner />}>
                <PaymentManual />
              </Suspense>
            ),
          },
          {
            path: "paymentauto",
            element: (
              <Suspense fallback={<Spinner />}>
                <PaymentAuto />
              </Suspense>
            ),
          },
          {
            path: "userorderdetails",
            element: (
              <Suspense fallback={<Spinner />}>
                <UserOrderDetails />
              </Suspense>
            ),
          },
          {
            path: "userorders",
            element: (
              <Suspense fallback={<Spinner />}>
                <UserOrders />
              </Suspense>
            ),
          },
          {
            path: "ordershistory",
            element: (
              <Suspense fallback={<Spinner />}>
                <OrdersHistory />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<Spinner />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
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
                  <Suspense fallback={<Spinner />}>
                    <Products />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <AddProduct />
                  </Suspense>
                ),
              },
              {
                path: "edit/:id",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <EditProduct />
                  </Suspense>
                ),
              },
              {
                path: "codes",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Codes />
                  </Suspense>
                ),
              },
              {
                path: ":productId/parts",
                children: [
                  {
                    path: "",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <Parts />
                      </Suspense>
                    ),
                  },
                  {
                    path: "add",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <AddPart />
                      </Suspense>
                    ),
                  },
                  {
                    path: ":partId/edit",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <EditPart />
                      </Suspense>
                    ),
                  }
                ]
              },
            ],
          },

          {
            path: "orders",
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Orders />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <OrderDetails />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "customers",
            element: (
              <Suspense fallback={<Spinner />}>
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
                  <Suspense fallback={<Spinner />}>
                    <Category />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <AddCategory />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "",
            element: (
              <Suspense fallback={<Spinner />}>
                <Settings />
              </Suspense>
            ),
            children: [
              {
                path: "site-setting",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <SiteSetting />
                  </Suspense>
                ),
              },
              {
                path: "social",
                children: [
                  {
                    path: "",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <Social />
                      </Suspense>
                    ),
                  },
                  {
                    path: "add",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <AddSocial />
                      </Suspense>
                    ),
                  },
                  {
                    path: "update/:id",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <EditSocial />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: "slider",
                children: [
                  {
                    path: "",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <Slider />
                      </Suspense>
                    ),
                  },
                  {
                    path: "add",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <AddSlider />
                      </Suspense>
                    ),
                  },
                  {
                    path: "edit/:id",
                    element: (
                      <Suspense fallback={<Spinner />}>
                        <EditSlider />
                      </Suspense>
                    ),
                  },
                ],
              },
              {
                path: "video",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Video />
                  </Suspense>
                ),
              },
              {
                path: "footer",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Footer />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "currency",
            element: (
              <Suspense fallback={<Spinner />}>
                <Currency />
              </Suspense>
            ),
          },
          {
            path: "custom-page",
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <CustomPage />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <AddPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "notification",
            children: [
              {
                path: "",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <Notification />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Spinner />}>
                    <AddNotification />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "adminlogin",
        element: (
          <Suspense fallback={<Spinner />}>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<Spinner />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Spinner />}>
            <Signup />
          </Suspense>
        ),
      }
    ]
  }

]);
