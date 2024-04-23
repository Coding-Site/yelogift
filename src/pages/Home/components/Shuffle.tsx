import { useEffect, useState } from "react";
import CardsFeed from "./CardsFeed";
import { ICategory } from "../../../models/ICategory";
import axios from "axios";
import { IProduct } from "../../../models/IProduct";

type Item = "all" | "entertainment" | "games" | "market" | "leisure";

function Shuffle() {
  // const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [entProducts, setEntProducts] = useState<IProduct[]>([]);
  const [gameProducts, setGameProducts] = useState<IProduct[]>([]);
  const [marketProducts, setMarketProducts] = useState<IProduct[]>([]);
  const [leisureProducts, setLeisureProducts] = useState<IProduct[]>([]);
  const [active, setActive] = useState<Item>("all");
  const [items, setItems] = useState([
    { img: "shuffle/all.png", title: "All", slug: "all", active: true },
    {
      img: "shuffle/ent.png",
      title: "Entertainment",
      slug: "entertainment",
      active: false,
    },
    { img: "shuffle/game.png", title: "Games", slug: "games", active: false },
    {
      img: "shuffle/market.png",
      title: "Market",
      slug: "market",
      active: false,
    },
    {
      img: "shuffle/leisure.png",
      title: "Leisure",
      slug: "leisure",
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

        // all.map((cat:ICategory) => setAllProducts((old:IProduct[]) => [...old, ...cat?.products]) )

        all.forEach((ca: ICategory) => {
          if (ca.name == "entertainment") {
            setEntProducts(ca.products as IProduct[]);
          }
          if (ca.name == "games") {
            setGameProducts(ca.products as IProduct[]);
          }
          if (ca.name == "market") {
            setMarketProducts(ca.products as IProduct[]);
          }
          if (ca.name == "leisure") {
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
            <img className="aspect-square size-12 md:size-20" src={item.img} alt="all" />
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
        {(active == "all" || active == "leisure") && (
          <CardsFeed title="Leisure" link="/" products={leisureProducts} />
        )}
        <CardsFeed title="Explore more" link="/" products={leisureProducts} />
      </div>
    </div>
  );
}

export default Shuffle;
