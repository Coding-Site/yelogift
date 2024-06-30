import { createHashRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Spinner from '../utils/Spinner';

const App = lazy(() => import('../App'));
const AdminLayout = lazy(() => import('../admin/AdminLayout'));
const Home = lazy(() => import('../pages/Home/Home'));
const Categories = lazy(() => import('../pages/Categories'));
const CategoryFeed = lazy(() => import('../pages/Category/Category'));
const SingleProduct = lazy(() => import('../pages/SingleProduct'));
const Checkout = lazy(() => import('../pages/Checkout'));
const CheckoutSingleNow = lazy(() => import('../pages/CheckoutSingleNow'));
const PaymentManual = lazy(() => import('../pages/PaymentManual'));
const PaymentAuto = lazy(() => import('../pages/PaymentAuto'));
const UserOrderDetails = lazy(() => import('../pages/UserOrderDetails'));
const UserOrders = lazy(() => import('../pages/UserOrders'));
const OrdersHistory = lazy(() => import('../pages/OrdersHistory'));
const Signin = lazy(() => import('../pages/Signin'));
const Signup = lazy(() => import('../pages/SignUp'));
const Search = lazy(() => import('../pages/Search'));
const About = lazy(() => import('../pages/About'));
const TermAndConditions = lazy(() => import('../pages/TermAndConditions'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const AdminHome = lazy(() => import('../admin/AdminHome/AdminHome'));
const AdminLogin = lazy(() => import('../admin/AdminLogin'));
const UserSettings = lazy(() => import('../pages/UserSettings'));
const SectionOrder = lazy(
    () => import('../admin/MyShop/SectionOrd/SectionOrder')
);
const PopularOrderRanking = lazy(
    () => import('../admin/MyShop/PopularOrderRanking/PopularOrderRanking')
);
const BinancePayFees = lazy(
    () => import('../admin/MyShop/BinancePayFees/BinancePayFees')
);

// Setting Pages
const AdminSettings = lazy(
    () => import('../admin/Admin Settings/AdminSettings')
);
const Settings = lazy(() => import('../admin/Settings/Settings'));
const Products = lazy(() => import('../admin/MyShop/Products/Products'));
const Parts = lazy(() => import('../admin/MyShop/Parts/Parts'));
const Codes = lazy(() => import('../admin/MyShop/Codes/Codes'));
const AddPart = lazy(() => import('../admin/MyShop/Parts/AddPart'));
const EditPart = lazy(() => import('../admin/MyShop/Parts/EditPart'));
const AddProduct = lazy(() => import('../admin/MyShop/Products/AddProduct'));
const EditProduct = lazy(() => import('../admin/MyShop/Products/EditProduct'));
// const Codes = lazy(() => import("../admin/MyShop/Products/Codes"));
const Orders = lazy(() => import('../admin/MyShop/Orders/Orders'));
const OrderDetails = lazy(() => import('../admin/MyShop/Orders/OrderDetails'));
const Customers = lazy(() => import('../admin/MyShop/Customers/Customers'));
const Category = lazy(() => import('../admin/MyShop/Category/Category'));
const AddCategory = lazy(() => import('../admin/MyShop/Category/AddCategory'));
const TopNavTable = lazy(() => import('../admin/Settings/TopNav/TopNavTable'));
const TopNavSettings = lazy(
    () => import('../admin/Settings/TopNav/TopNavSettings')
);
const TopNavAdd = lazy(() => import('../admin/Settings/TopNav/TopNavAdd'));

const ContactUsSettings = lazy(
    () => import('../admin/Settings/ContactUS/ContactUsSettings')
);

// Site Settings Pages
const SiteSetting = lazy(
    () => import('../admin/Settings/SiteSetting/SiteSetting')
);
const Social = lazy(() => import('../admin/Settings/Social/Social'));
const AddSocial = lazy(() => import('../admin/Settings/Social/AddSocial'));
const EditSocial = lazy(() => import('../admin/Settings/Social/EditSocial'));
const Slider = lazy(() => import('../admin/Settings/Slider/Slider'));
const AddSlider = lazy(() => import('../admin/Settings/Slider/AddSlider'));
const EditSlider = lazy(() => import('../admin/Settings/Slider/EditSlider'));
const Video = lazy(() => import('../admin/Settings/Video/Video'));
const Footer = lazy(() => import('../admin/Settings/Footer/Footer'));

// Other Pages
const Currency = lazy(() => import('../admin/Currency/Currency'));
const BinanceAuth = lazy(() => import('../admin/BinanceAuth/BinanceAuth'));

const PaymentSetting = lazy(
    () => import('../admin/Payment setting/PaymentSetting')
);
const AddPayment = lazy(() => import('../admin/Payment setting/AddPayment'));
const EditPayment = lazy(() => import('../admin/Payment setting/EditPayment'));

const Notification = lazy(() => import('../admin/Notification/Notification'));
const SeoControl = lazy(() => import('../admin/SeoControl/SeoControl'));

const AddNotification = lazy(
    () => import('../admin/Notification/AddNotification')
);
const CustomPage = lazy(() => import('../admin/CustomPage/CustomPage'));
const AddPage = lazy(() => import('../admin/CustomPage/AddPage'));
const Main = lazy(() => import('./Main'));

export const router = createHashRouter([
    {
        path: '',
        element: <Main />,
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <App />
                    </Suspense>
                ),
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Home />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'categories',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Categories />
                                    </Suspense>
                                ),
                            },
                            {
                                path: ':categoryId',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <CategoryFeed />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'product/:id',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <SingleProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'checkout',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Checkout />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'product/:id/buy-now/:orderId',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <CheckoutSingleNow />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'paymentmanual',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <PaymentManual />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'paymentauto',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <PaymentAuto />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'userorderdetails',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <UserOrderDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'userorders',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <UserOrders />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'user-settings',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <UserSettings />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'ordershistory',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <OrdersHistory />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'search/:keyword',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Search />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'about-us',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <About />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'term-and-conditions',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <TermAndConditions />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'privact-policy',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <PrivacyPolicy />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'admin',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AdminLayout />
                    </Suspense>
                ),
                children: [
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <AdminHome />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'section-order',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <SectionOrder />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'popular-order',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <PopularOrderRanking />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'binance-pay-fee',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <BinancePayFees />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'products',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Products />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'add',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <AddProduct />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'edit/:id',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <EditProduct />
                                    </Suspense>
                                ),
                            },
                            {
                                path: ':productId/parts',
                                children: [
                                    {
                                        path: '',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <Parts />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'add',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <AddPart />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: ':partId/edit',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <EditPart />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: ':partId/codes',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <Codes />
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'orders',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Orders />
                                    </Suspense>
                                ),
                            },
                            {
                                path: ':id',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <OrderDetails />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'customers',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Customers />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'category',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Category />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'add',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <AddCategory />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: '',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Settings />
                            </Suspense>
                        ),
                        children: [
                            {
                                path: 'site-setting',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <SiteSetting />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'social',
                                children: [
                                    {
                                        path: '',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <Social />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'add',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <AddSocial />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'update/:id',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <EditSocial />
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                            {
                                path: 'slider',
                                children: [
                                    {
                                        path: '',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <Slider />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'add',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <AddSlider />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'edit/:id',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <EditSlider />
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                            {
                                path: 'video',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Video />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'footer',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Footer />
                                    </Suspense>
                                ),
                            },
                            // {
                            //     path: 'topnav-settings',
                            //     element: (
                            //         <Suspense fallback={<Spinner />}>
                            //             <TopNavTable />
                            //         </Suspense>
                            //     ),
                            // },
                            {
                                path: 'topnav-settings',
                                children: [
                                    {
                                        path: '',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <TopNavTable />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'edit/:id',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <TopNavSettings />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'add',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <TopNavAdd />
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                            {
                                path: 'payment-setting',
                                children: [
                                    {
                                        path: '',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <PaymentSetting />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'add',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <AddPayment />
                                            </Suspense>
                                        ),
                                    },
                                    {
                                        path: 'edit/:id',
                                        element: (
                                            <Suspense fallback={<Spinner />}>
                                                <EditPayment />
                                            </Suspense>
                                        ),
                                    },
                                ],
                            },
                            {
                                path: 'contact-settings',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <ContactUsSettings />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'currency',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <Currency />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'binance-auth',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <BinanceAuth />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'custom-page',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <CustomPage />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'add',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <AddPage />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'notification',
                        children: [
                            {
                                path: '',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <Notification />
                                    </Suspense>
                                ),
                            },
                            {
                                path: 'add',
                                element: (
                                    <Suspense fallback={<Spinner />}>
                                        <AddNotification />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                    {
                        path: 'admin-settings',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <AdminSettings />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'ceo-control',
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <SeoControl />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'adminlogin',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AdminLogin />
                    </Suspense>
                ),
            },
            {
                path: 'signin',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Signin />
                    </Suspense>
                ),
            },
            {
                path: 'signup',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Signup />
                    </Suspense>
                ),
            },
        ],
    },
]);
