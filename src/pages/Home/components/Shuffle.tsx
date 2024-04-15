import React, { useState } from "react";
import CardsFeed from "./CardsFeed";
import { ICard } from "../../../models/ICard";

type Item = "all" | "ent" | "game" | "market" | "leisure";

function Shuffle() {
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

  const cards: ICard[] = [
    { image: "cards/card1.png", link: "/", title: 'Netflix', category: 'Entertainment' },
    { image: "cards/card2.png", link: "/", title: 'title1', category: 'category' },
    { image: "cards/card3.png", link: "/", title: 'title1', category: 'category' },
    { image: "cards/card4.png", link: "/", title: 'title1', category: 'category' },
    { image: "cards/card5.png", link: "/", title: 'title1', category: 'category' },
    { image: "cards/card3.png", link: "/", title: 'title1', category: 'category' },
    { image: "cards/card1.png", link: "/", title: 'title1', category: 'category' },
  ];

  const handleActiveItem = (slug: Item) => {
    setActive(slug);
    setItems((old) =>
      old.map((o) => ({ ...o, active: o.slug == slug ? true : false }))
    );
  };

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
                item.slug == active ? "bg-main text-mainBalck" : "text-main"
              } py-1 px-4 rounded-full`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="felx flex-col">
        <CardsFeed title="Entertainment" link="/" cards={cards} />
        <CardsFeed title="Games" link="/" cards={cards} />
        <CardsFeed title="Market" link="/" cards={cards} />
        <CardsFeed title="Leisure" link="/" cards={cards} />
        <CardsFeed title="Explore more" link="/" cards={cards} />
      </div>
    </div>
  );
}

export default Shuffle;
