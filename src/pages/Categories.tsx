import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [loading, setLoading] = useState<boolean>(false);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BASEURL}/api/home/products`).then((d) => {
      const prods = d.data.data;
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full py-5 container ps-12">
      <div className="flex items-center justify-start w-full relative ">
        <Link to="/admin/products">
          <FaChevronLeft className="text-main text-2xl absolute -left-7 font-semibold top-[50%] -translate-y-[50%]" />
        </Link>
        <span className="text-3xl text-white font-semibold">
          More cards for you
        </span>
      </div>
      <div className="flex container flex-wrap">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          Products.map((pro, idx) => (
            <Link
              key={idx}
              to={`/product/${pro.id}`}
              className="flex flex-col items-center sm:px-4 py-5 w-full  sm:w-1/2 lg:w-1/4 px-12"
            >
              <Cart />
            </Link>
          ))
        )}
      </div>

      <Pagination pages={5} active={1} />
    </div>
  );
}

export default Categories;

const Cart = () => {
  return (
    <>
      <div className="bg-white rounded-md p-3 pt-6  flex flex-col items-center w-full ">
        <div className="relative w-1/3 rounded-full bg-black h-[20px]">
          <div className="size-7 rounded-full bg-black absolute -top-[50%] left-[50%] -translate-x-[50%]"></div>
        </div>

        <span className="text-gray-500 uppercase my-2">Email Devlivery</span>
        <img src="cards/card2.png" alt="card" className="rounded-md" />
      </div>

      <div className="flex justify-between w-full py-2 font-semibold">
        <div className="flex flex-col ">
          <span>ebay</span>
          <span>20 SAR</span>
        </div>
        <div className="flex">
          5.0 <FaStar className="ms-1 text-main" />
        </div>
      </div>
    </>
  );
};

const Pagination = ({ pages, active }: { pages: number; active: number }) => {
  const [actv, setActv] = useState<number>(active);
  const [arr, setArr] = useState<number[]>([]);
  useEffect(() => {
    for (let i = 1; i < pages; i++) {
      setArr((old: number[]) => [...old, i]);
    }
  }, [pages]);

  const Prev = () => {
    setActv((old) => {
      return actv == arr[0] ? actv : --old;
    });
  };
  const Next = () => {
    setActv((old) => {
      return actv == arr.length ? actv : ++old;
    });
  };
  return (
    <div className="flex justify-center items-center w-[350px] mx-auto [&>*]:cursor-pointer">
      <FaChevronLeft className="text-main text-3xl " onClick={Prev} />
      <div className={`gap-5 flex justify-center items-center w-[250px] `}>
        {arr.map((p) => (
          <span
            key={p}
            className={` border size-10  rounded flex justify-center items-center border-main ${
              p == actv ? "bg-main text-mainLightBlack" : ""
            } `}
            onClick={() => setActv(p)}
          >
            {p}
          </span>
        ))}
      </div>
      <FaChevronRight className="text-main text-3xl" onClick={Next} />
    </div>
  );
};
