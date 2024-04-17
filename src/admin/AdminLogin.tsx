import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { FiSearch } from "react-icons/fi";

function AdminLogin() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  if (user) return navigate("/admin");
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="bg-mainLightBlack p-4  flex flex-col w-1/2">
          <div className="p-5 h-1/5 flex flex-col gap-3">
            <img className="w-28" src="/logo.png" alt="logo" />
            <h2>Login as Admin</h2>
          </div>
          <div className="relative">
            <hr className="bg-mainWhite " />
            <span className="absolute left-[50%] -translate-x-[50%] -top-2 bg-mainLightBlack px-4 text-nowrap text-xs">
              continue with email or phone number
            </span>
          </div>

          <form className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[65%]">
            <div className="relative w-full">
              <input
                type="email"
                className="bg-transparent border rounded-lg w-full ps-8 py-2 placeholder:text-white placeholder:text-xs "
                placeholder="Email or phone number"
              />
              <FiSearch className="absolute left-2 top-[50%] -translate-y-[50%]" />
            </div>
            <div className="relative w-full">
              <input
                type="password"
                className="bg-transparent border w-full rounded-lg ps-8 py-2 placeholder:text-white placeholder:text-xs placeholder:font-light"
                placeholder="Enter password"
              />
              <FiSearch className="absolute left-2 top-[50%] -translate-y-[50%]" />
            </div>
            <div className="flex justify-between w-full items-center">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-warning checkbox-sm rounded-md"
                  />
                  remember me
                </label>
                <Link to="/" className="text-main underline text-sm">forget password</Link>
            </div>
          </form>
        </div>
        <img className="w-1/2" src="/admin/login-hero.jpg" alt="admin hero" />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLogin;
