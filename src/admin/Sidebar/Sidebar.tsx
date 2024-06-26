import { CiSearch } from 'react-icons/ci';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiCircle } from 'react-icons/fi';
import { FaRegCircleStop } from 'react-icons/fa6';

function Sidebar() {
    const location = useLocation();
    const isPathActive = (paths: any) => {
        return paths.some((path: any) => location.pathname.includes(path));
    };
    return (
        <div className="flex flex-col gap-4 bg-mainBlack p-4 w-[250px] ">
            <Link to="/">
                <img
                    className="w-[60%] me-auto"
                    src="/assets/Logo/Asset-1.png"
                    alt="logo"
                />
            </Link>
            <div className=" relative hidden">
                <input
                    type="text"
                    className="border peer rounded-lg bg-transparent text-mainWhite p-1 w-full"
                />
                <CiSearch className="w-10 absolute peer-focus:hidden flex left-1 top-[50%] -translate-y-[50%] text-mainWhite" />
            </div>

            <ul className="menu menu-xs text-mainWhite rounded-lg max-w-xs w-full">
                <li>
                    <details open>
                        <summary
                            className={
                                isPathActive([
                                    '/admin/products',
                                    '/admin/category',
                                    '/admin/orders',
                                ])
                                    ? 'text-main'
                                    : ''
                            }
                        >
                            My Shop
                        </summary>
                        <ul>
                            <li>
                                <NavItem item="Products" to="/admin/products" />
                            </li>
                            <li>
                                <NavItem item="Category" to="/admin/category" />
                            </li>
                            <li>
                                <NavItem item="Orders" to="/admin/orders" />
                            </li>
                            <li>
                                <NavItem
                                    item="Sections Order Ranking"
                                    to="/admin/section-order"
                                />
                            </li>
                            <li>
                                <NavItem
                                    item="Popular Order Ranking"
                                    to="/admin/popular-order"
                                />
                            </li>
                            <li>
                                <NavItem
                                    item="Binance Pay Fee"
                                    to="/admin/binance-pay-fee"
                                />
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details open>
                        <summary
                            className={
                                isPathActive([
                                    '/admin/site-setting',
                                    '/admin/slider',
                                    '/admin/social',
                                    '/admin/footer',
                                    '/admin/video',
                                ])
                                    ? 'text-main'
                                    : ''
                            }
                        >
                            Settings
                        </summary>
                        <ul>
                            {/* <li>
                                <NavItem
                                    item="Site Settings"
                                    to="/admin/site-setting"
                                />
                            </li> */}
                            <li>
                                <NavItem item="Slider" to="/admin/slider" />
                            </li>
                            <li>
                                <NavItem item="Social" to="/admin/social" />
                            </li>
                            <li>
                                <NavItem item="Footer" to="/admin/footer" />
                            </li>
                            <li>
                                <NavItem
                                    item="Contact Us"
                                    to="/admin/contact-settings"
                                />
                            </li>
                            <li>
                                <NavItem
                                    item="Ad Nav-bar"
                                    to="/admin/topnav-settings"
                                />
                            </li>
                            {/* <li>
                                <NavItem item="Video" to="/admin/video" />
                            </li> */}
                        </ul>
                    </details>
                </li>
                <li>
                    <NavEc item="Currency" to="/admin/currency" />
                </li>
                <li>
                    <NavEc item="Payment Setting" to="/admin/payment-setting" />
                </li>
                {/* <li>
                    <NavEc item="Custom Page" to="/admin/custom-page" />
                </li> */}
                <li>
                    <NavEc item="Notification" to="/admin/notification" />
                </li>
                <li>
                    <NavEc item="Admin Settings" to="/admin/admin-settings" />
                </li>
                <li>
                    <NavEc item="SEO control" to="/admin/ceo-control" />
                </li>
                <li>
                    <NavEc item="Binance Auth" to="/admin/binance-auth" />
                </li>
            </ul>

            <div className="flex mt-auto gap-2">
                <img
                    src="/assets/admin/admin.png"
                    alt="admin"
                    className="rounded-full size-12"
                />
                <div className="flex flex-col justify-center gap-0 ">
                    <span className="font-bold text-sm">Jonathon Treat</span>
                    <span className="text-xs">Admin.com</span>
                </div>
            </div>
        </div>
    );
}

interface NavItemProps {
    item: string;
    to: string;
}

const NavItem = ({ item, to }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? '!text-main' : '!text-mainWhite'
            }
        >
            {({ isActive }) => (
                <div className={`flex items-center gap-2 `}>
                    {!isActive ? <FiCircle /> : <FaRegCircleStop />}
                    <span className="text-nowrap	">{item}</span>
                </div>
            )}
        </NavLink>
    );
};

const NavEc = ({ item, to }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? '!text-main' : '!text-mainWhite'
            }
        >
            {({ isActive }) => (
                <div
                    className={`flex items-center gap-2 ${
                        !isActive ? '' : 'mainColor'
                    } `}
                >
                    <span>{item}</span>
                </div>
            )}
        </NavLink>
    );
};

export default Sidebar;
