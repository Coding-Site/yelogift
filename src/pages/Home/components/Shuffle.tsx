import React, { useEffect, useState } from "react";
import CardsFeed from "./CardsFeed";
import { ICard } from "../../../models/ICard";
import { ICategory } from "../../../models/ICategory";
import axios from "axios";

type Item = "all" | "ent" | "game" | "market" | "leisure";

function Shuffle() {
  const [allProducts, setAllProducts] = useState<ICategory[]>([]);
  const [entProducts, setEntProducts] = useState<ICard[]>([]);
  const [gameProducts, setGameProducts] = useState<ICard[]>([]);
  const [marketProducts, setMarketProducts] = useState<ICard[]>([]);
  const [leisureProducts, setLeisureProducts] = useState<ICard[]>([]);
  const [active, setActive] = useState<Item>("all");
  const [items, setItems] = useState([
    { img: "shuffle/all.png", title: "All", slug: "all", active: true },
    {
      img: "shuffle/ent.png",
      title: "Entertainment",
      slug: "ent",
      active: false,
    },
    { img: "shuffle/game.png", title: "Games", slug: "game", active: false },
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
        const all = categories.data.data;
        
        setAllProducts(categories.data.data);
      });
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center gap-5 w-full container">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col items-center justify-between cursor-pointer"
            onClick={() => handleActiveItem(item.slug as Item)}
          >
            <img className="aspect-square " src={item.img} alt="all" />
            <span
              className={`${
                item.slug == active ? "bg-main text-mainBlack" : "text-main"
              } py-1 px-4 rounded-full`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* 
      <div className="felx flex-col">
        {(active == "all" || active == "ent") && (
          <CardsFeed title="Entertainment" link="/" cat="" />
        )}
        {(active == "all" || active == "game") && (
          <CardsFeed title="Games" link="/" cards={cards} />
        )}
        {(active == "all" || active == "market") && (
          <CardsFeed title="Market" link="/" cards={cards} />
        )}
        {(active == "all" || active == "leisure") && (
          <CardsFeed title="Leisure" link="/" cards={cards} />
        )}
        <CardsFeed title="Explore more" link="/" cards={cards} />
      </div> */}
    </div>
  );
}

export default Shuffle;
