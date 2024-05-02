import { useEffect, useState } from "react";
import CardsFeed from "./CardsFeed";
import { ICategory } from "../../../models/ICategory";
import axios from "axios";
import { IProduct } from "../../../models/IProduct";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type Item = "all" | "entertainment" | "games" | "market" | "gift";

function Shuffle() {

  const [entProducts, setEntProducts] = useState<IProduct[]>([]);
  const [gameProducts, setGameProducts] = useState<IProduct[]>([]);
  const [marketProducts, setMarketProducts] = useState<IProduct[]>([]);
  const [leisureProducts, setLeisureProducts] = useState<IProduct[]>([]);
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

        console.log(all)
        // all.map((cat:ICategory) => setAllProducts((old:IProduct[]) => [...old, ...cat?.products]) )

        all.forEach((ca: ICategory) => {
          if (ca.name == "Entertainment") {
            setEntProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Game") {
            setGameProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Ecommerce") {
            setMarketProducts(ca.products as IProduct[]);
          }
          if (ca.name == "Gift") {
            setLeisureProducts(ca.products as IProduct[]);
          }
        });

        // setAllProducts(categories.data.data);
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
          <CardsFeed title="Entertainment" link="/" products={entProducts} />
        )}
        {(active == "all" || active == "games") && (
          <CardsFeed title="Games" link="/" products={gameProducts} />
        )}
        {(active == "all" || active == "market") && (
          <CardsFeed title="Market" link="/" products={marketProducts} />
        )}
        {(active == "all" || active == "gift") && (
          <CardsFeed title="Gift" link="/" products={leisureProducts} />
        )}
        <CardsFeed title="Explore more" link="/" products={leisureProducts} />
      </div>
    </div>
  );
}

export default Shuffle;
