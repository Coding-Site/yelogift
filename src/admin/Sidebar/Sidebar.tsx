import { CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { FiCircle } from "react-icons/fi";
import { FaRegCircleStop } from "react-icons/fa6";

function Sidebar() {

  return (
    <div className="flex flex-col gap-4 bg-mainBlack p-4 w-[250px] ">
      <Link to="/">
        <img className="w-[60%] me-auto" src="/assets/logo.png" alt="logo" />
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
            <summary>My Shop</summary>
            <ul>
              <li>
                <NavItem item="Products" to="/admin/products" />
              </li>
              {/* <li>
                <NavItem item="Parts" to="/admin/parts" />
              </li> */}
              <li>
                <NavItem item="Category" to="/admin/category" />
              </li>
              <li>
                <NavItem item="Orders" to="/admin/orders" />
              </li>
              {/* <li>
                <NavItem item="Customers" to="/admin/customers" />
              </li> */}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Settings</summary>
            <ul>
              <li>
                <NavItem item="Site Settings" to="/admin/site-setting" />
              </li>
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
                <NavItem item="Video" to="/admin/video" />
              </li>
            </ul>
          </details>
        </li>

        <li>
          <NavItem item="Currency" to="/admin/currency" />
        </li>
        <li>
          <NavItem item="Custom Page" to="/admin/custom-page" />
        </li>
        <li>
          <NavItem item="Notification" to="/admin/notification" />
        </li>
      </ul>

      <div className="flex mt-auto gap-2">
        <img src="/assets/admin/admin.png" alt="admin" className="rounded-full size-12" />
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
        isActive ? "!text-main" : "!text-mainWhite"
      }
    >
      {({ isActive }) => (
        <div className={`flex items-center gap-2 `}>
          {!isActive ? <FiCircle /> : <FaRegCircleStop />}
          <span>{item}</span>
        </div>
      )}
    </NavLink>
  );
};
export default Sidebar;
