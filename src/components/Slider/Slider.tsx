import { useState } from "react";
import { Slide } from "../../models/ISlide";
import "./Slider.css";
function Slider() {
 
  const [slides, setSliedes] = useState<Slide[]>([
    { img: "slider/slide1.png", htmlFor: "s1", id: "slide1", checked: true },
    { img: "slider/slide2.png", htmlFor: "s2", id: "slide2", checked: false },
    { img: "slider/slide3.png", htmlFor: "s3", id: "slide3", checked: false },
    { img: "slider/slide4.png", htmlFor: "s4", id: "slide4", checked: false },
    { img: "slider/slide5.png", htmlFor: "s5", id: "slide5", checked: false },
  ])
 



  const GoNext = () => {
    const activeIndex = slides.findIndex((s) => s.checked);

    const modified: Slide[] = slides.map((sl, idx) => {
      if(idx == activeIndex){
        return {...sl, checked: false}
      }
      if(idx == activeIndex +1){
        return {...sl, checked: true}
      }
      return sl;
    }) ;
  
    console.log(modified);
    setSliedes(modified)

  }

  const GoPrev = () => {
    const activeIndex = slides.findIndex((s) => s.checked);

    const modified: Slide[] = slides.map((sl, idx) => {
      if(idx == activeIndex){
        return {...sl, checked: false}
      }
      if(idx == activeIndex +1){
        return {...sl, checked: true}
      }
      return sl;
    }) ;
  

    console.log(modified);
    setSliedes(modified)

  }

  return (
    <section id="slider" className="relative h-auto">
      <button className="next absolute top-[50%] -left-44 " onClick={GoNext}><img src="slider/next.png" /></button>
      <button className="prev absolute top-[50%] -right-44" onClick={GoPrev}><img src="slider/prev.png" /></button>
      {slides.map((slide) => (
        <input
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
          <img src={slide.img} className="w-full h-full" alt={slide.id} />
        </label>
      ))}

     
    </section>
  );
}

export default Slider;
