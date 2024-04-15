import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-mainBlack text-mainWhite">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="cats" element={<Categories />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
