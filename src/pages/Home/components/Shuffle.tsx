import { useEffect, useState } from "react";
import CardsFeed from "./CardsFeed";
import { ICategory } from "../../../models/ICategory";
import axios from "axios";
import { IProduct } from "../../../models/IProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type Item = "all" | "entertainment" | "games" | "market" | "gift" | "telecom";

function Shuffle() {

  const [entProducts, setEntProducts] = useState<IProduct[]>([]);
  const [gameProducts, setGameProducts] = useState<IProduct[]>([]);
  const [marketProducts, setMarketProducts] = useState<IProduct[]>([]);
  const [giftProducts, setGiftProducts] = useState<IProduct[]>([]);
  const [telecomProducts, setTelecomProducts] = useState<IProduct[]>([]);
  const [active, setActive] = useState<Item>("all");
  const isDark : boolean = useSelector((state: RootState) => state.themeSlice.isDark);
  const [items, setItems] = useState([
    { img: `assets/shuffle/${isDark ? 'dark' :'light'}/all.png`, title: "All", slug: "all", active: true },
    {
      img: `assets/shuffle/${isDark ? 'dark' :'light'}/entertainment.png`,
      title: "Entertainment",
      slug: "entertainment",
      active: false,
    },
    {
      img: `assets/shuffle/${isDark ? 'dark' :'light'}/game.png`,
      title: "Games",
      slug: "games",
      active: false,
    },
    {
      img: `assets/shuffle/${isDark ? 'dark' :'light'}/ecommerce.png`,
      title: "Market",
      slug: "market",
      active: false,
    },
    {
      img: `assets/shuffle/${isDark ? 'dark' :'light'}/gift.png`,
      title: "Gift",
      slug: "gift",
      active: false,
    },
    {
      img: `assets/shuffle/${isDark ? 'dark' :'light'}/telecom.png`,
      title: "Telecom",
      slug: "telecom",
      active: false,
    },
  ]);


  const handleActiveItem = (slug: Item) => {
    setActive(slug);
    setItems((old) =>
      old.map((o) => ({ ...o, active: o.slug == slug ? true : false }))
    );
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/home/categories`)
      .then((categories) => {
        const all: ICategory[] = categories.data.data;

        all.forEach((ca: ICategory) => {
          if (ca.name == "Entertainment") {
            setEntProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Game") {
            setGameProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Telecom") {
            setTelecomProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Market") {
            setMarketProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Gift") {
            setGiftProducts(ca.products as IProduct[]);
          }
        });

      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center gap-5 w-full container">
  
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col items-center w-24 justify-between cursor-pointer"
            onClick={() => handleActiveItem(item.slug as Item)}
          >
            <img
              className="aspect-square size-12 mb-2 md:size-20"
              src={item.img}
              alt="all"
            />
            <span
              className={`${
                item.slug == active ? "bg-main text-mainBlack" : "text-main"
              } py-1 px-2 rounded-full text-xs`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="felx flex-col">
        {(active == "all" || active == "entertainment") && (
          <CardsFeed title="Entertainment" link="categories/2" products={entProducts} />
        )}
        {(active == "all" || active == "games") && (
          <CardsFeed title="Games" link="categories/7" products={gameProducts} />
        )}
        {(active == "all" || active == "market") && (
          <CardsFeed title="Market" link="categories/3" products={marketProducts} />
        )}
        {(active == "all" || active == "gift") && (
          <CardsFeed title="Gift" link="categories/4" products={giftProducts} />
        )}
        {(active == "all" || active == "telecom") && (
          <CardsFeed title="Telecom" link="categories/6" products={telecomProducts} />
        )}
      </div>
    </div>
  );
}

export default Shuffle;
