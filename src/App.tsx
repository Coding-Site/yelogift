import { BrowserRouter, Outlet, Route, Routes, Sw } from "react-router-dom";

import Home from "./pages/Home/Home";
import AdminHome from "./admin/AdminHome/AdminHome";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./admin/Admin";
import Footer from "./components/Footer";
import { ReactNode } from "react";
import NonAdminLayout from "./Layouts/NonAdminLayout";
interface Props {
  children?: ReactNode
}

function App() {
  return (
    <div className="bg-mainBlack text-mainWhite">
      <NonAdminLayout />
      {/* <BrowserRouter>
      
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} />

          <Route path="cats" element={<Categories />} />
          <Route path="admin" element={<Admin   />} >
            <Route path="home" element={<AdminHome />}/>
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter> */}
    </div>
  );
}

export default App;
