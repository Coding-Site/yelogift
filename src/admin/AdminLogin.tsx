import { Link,  useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { IoIosLock } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
// import { useToken } from "../hooks/useToken";
type Inputs = {
  email: string;
  password: string;
};

function AdminLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // const { token} = useToken();
  const {  setUser } = useAuth();
  const { setItem } = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/admin/auth/login`, data)
      .then((d) => {
        if (d.status == 200) {
          setUser(d.data.data);
          setItem("userData", d.data.data);
          setLoading(false);
          navigate("/admin");
        }
      });
  };

  // if (token) return <Navigate to="/admin" />;
  return (
    <div className="flex flex-col text-mainWhite">
      <div className="flex">
        <div className="bg-mainLightBlack p-4  flex flex-col w-1/2">
          <div className="p-5 h-1/5 flex flex-col gap-3">
            <img className="w-28" src="/assets/logo.png" alt="logo" />
            <h2>Login as Admin</h2>
          </div>
          <div className="relative">
            <hr className="bg-mainWhite " />
            <span className="absolute left-[50%] -translate-x-[50%] -top-2 bg-mainLightBlack px-4 text-nowrap text-xs">
              continue with email or phone number
            </span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-10 flex flex-col justify-center mx-auto items-center gap-5 w-[65%]"
          >
            <div className="relative w-full">
              <input
                type="email"
                {...register("email", { required: true })}
                className="bg-transparent border rounded-lg w-full ps-12 py-2 placeholder:text-white placeholder:text-xs "
                placeholder="Email or phone number"
              />
              <FaEnvelope className="absolute left-4 top-[50%] -translate-y-[50%]" />
            </div>
            {errors.email && <span>This field is required</span>}
            <div className="relative w-full">
              <input
                {...register("password", { required: true })}
                type="password"
                className="bg-transparent border w-full rounded-lg ps-12 py-2 placeholder:text-white placeholder:text-xs placeholder:font-light"
                placeholder="Enter password"
              />
              <IoIosLock className="absolute left-4 top-[50%] -translate-y-[50%]" />
            </div>
            {errors.password && <span>This field is required</span>}
            <div className="flex justify-between w-full items-center">
              <label className="cursor-pointer label p-0">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-warning checkbox-sm me-4 rounded-md"
                />
                remember me
              </label>
              <Link to="/" className="text-main underline text-xs">
                forget password?
              </Link>
            </div>
            <button className="btn !w-[80%] !rounded-md mt-12 mx-auto">
              {loading ? "loading..." : "login"}
            </button>
          </form>
        </div>
        <img className="w-1/2" src="/assets/admin/login-hero.jpg" alt="admin hero" />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLogin;
