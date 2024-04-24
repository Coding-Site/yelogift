import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function NonAdminLayout () {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default NonAdminLayout;
