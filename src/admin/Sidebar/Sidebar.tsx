import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { FiCircle } from "react-icons/fi";
import { FaRegCircleStop } from "react-icons/fa6";

function Sidebar() {
  // const navItems = [
  //   {
  //     item: "My Shop",
  //     to: "",
  //     children: [
  //       { item: "Products", to: "/admin/products" },
  //       { item: "Category", to: "/admin/category" },
  //       { item: "Orders", to: "/admin/orders" },
  //       { item: "Customers", to: "/admin/customers" },
  //     ],
  //   },
  //   {
  //     item: "Settings",
  //     to: "",
  //     children: [
  //       { item: "Site Settings", to: "/admin/products" },
  //       { item: "Slider", to: "/admin/category" },
  //       { item: "Social", to: "/admin/orders" },
  //       { item: "Footer", to: "/admin/customers" },
  //       { item: "Video", to: "/admin/customers" },
  //     ],
  //   },
  //   { item: "Currency ", to: "" },
  //   { item: "Custom Page", to: "" },
  //   { item: "Notification", to: "" },
  // ];

  return (
    <div className="flex flex-col gap-4 bg-mainBlack p-4 ">
      <img className="w-[60%] me-auto" src="/logo.png" alt="logo" />
      <div className="flex relative">
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
              <li>
                <NavItem item="Category" to="/admin/category" />
              </li>
              <li>
                <NavItem item="Orders" to="/admin/orders" />
              </li>
              <li>
                <NavItem item="Customers" to="/admin/customers" />
              </li>
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
        <img src="/admin/admin.png" alt="admin"  className="rounded-full aspect-square"/>
        <div className="flex flex-col gap-0 ">
          <span className="font-bold">Jonathon Treat</span>
          <span>Admin.com</span>
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
