import { useEffect, useState } from "react";
import { ISlide } from "../../models/ISlide";
import "./Slider.css";
function Slider() {
  const [slides, setSliedes] = useState<ISlide[]>([
    { img: "assets/slider/slide1.png", htmlFor: "s1", id: "slide1", checked: true },
    { img: "assets/slider/slide2.png", htmlFor: "s2", id: "slide2", checked: false },
    { img: "assets/slider/slide3.png", htmlFor: "s3", id: "slide3", checked: false },
    { img: "assets/slider/slide4.png", htmlFor: "s4", id: "slide4", checked: false },
    { img: "assets/slider/slide5.png", htmlFor: "s5", id: "slide5", checked: false },
  ]);

  const GoNext = () => {
    // const activeIndex = slides.findIndex((s) => s.checked);
    // const modified: ISlide[] = slides.map((sl, idx) => {
    //     if(idx == activeIndex){
    //       return {...sl, checked: false}
    //     }
    //     if(idx == activeIndex +1){
    //       return {...sl, checked: true}
    //     }
    //   return sl;
    // }) ;

    // setSliedes(modified)

    
    // const elements: Element[] = Array.from(
    //   document.getElementsByClassName("slideItem")
    // );

    // (elements as HTMLInputElement[]).forEach((element) => {
    //   let target: HTMLInputElement;
    //   if (element.defaultChecked) {
    //     target = element.nextElementSibling as HTMLInputElement;
    //     target.click();
    //   }
    // });
  };

  useEffect(() => {}, []);

  const GoPrev = () => {
    const activeIndex = slides.findIndex((s) => s.checked);

    const modified: ISlide[] = slides.map((sl, idx) => {
      if (idx == activeIndex) {
        return { ...sl, checked: false };
      }
      if (idx == activeIndex + 1) {
        return { ...sl, checked: true };
      }
      return sl;
    });

    console.log(modified);
    setSliedes(modified);
  };

  return (
    <section id="slider" className="relative h-auto">
      <button
        className="next absolute top-[20%] md:top-[50%]  md:-left-44 -left-20 "
        onClick={GoNext}
      >
        <img src="assets/slider/next.png" />
      </button>
      <button
        className="prev absolute top-[20%] md:top-[50%] md:-right-44 -right-20 "
        onClick={GoPrev}
      >
        <img src="assets/slider/prev.png" />
      </button>
      {slides.map((slide) => (
        <input
          className="slideItem"
          key={slide.id}
          type="radio"
          name="slider"
          id={slide.htmlFor}
          defaultChecked={slide.checked}
          // checked={slide.checked}
        />
      ))}
      {slides.map((slide) => (
        <label key={slide.id} htmlFor={slide.htmlFor} id={slide.id}>
          <img
            src={slide.img}
            className="w-[100px] sm:w-[300px] lg:w-full h-[150px] sm:h-[500px] lg:h-full"
            alt={slide.id}
          />
        </label>
      ))}
    </section>
  );
}

export default Slider;
