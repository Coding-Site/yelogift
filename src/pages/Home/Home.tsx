import React from "react";
import Slider from "../../components/Slider/Slider";
import PopularCards from "./components/PopularCards";
import Shuffle from "./components/Shuffle";

function Home() {
  return (
    <div className="py-10">
      <Slider />
      <div className="flex flex-col gap-7 relative">
        <div className="text-lg text-main font-semibold text-center">
          Unlock Endless Gaming Adventures with Steam Gift Cards!
        </div>
        <div className="text-lg text-mainWhite w-[80%] mx-auto font-extralight text-center">
          Give the gift of choice with a Steam Gift Card! From AAA titles to
          indie gems, the recipient can explore a vast library of games on the
          world's largest gaming platform. Whether they're into action,
          adventure, or strategy, let them choose their next gaming obsession
          with a Steam Gift Card.
        </div>
        <button className="btn mx-auto !h-12 "> Explore Now</button>
      </div>

      <PopularCards />


      <Shuffle />

      
    </div>
  );
}

export default Home;
