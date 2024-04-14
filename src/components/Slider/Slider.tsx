import { Slide } from "../../models/Slide";
import "./Slider.css";
function Slider() {
 
 
  const slides : Slide[] = [
    { img: "slider/slide1.png", htmlFor: "s1", id: "slide1", checked: true },
    { img: "slider/slide2.png", htmlFor: "s2", id: "slide2", checked: false },
    { img: "slider/slide3.png", htmlFor: "s3", id: "slide3", checked: false },
    { img: "slider/slide4.png", htmlFor: "s4", id: "slide4", checked: false },
    { img: "slider/slide5.png", htmlFor: "s5", id: "slide5", checked: false },
  ];


  // const GoNext = () => {

  // }

  return (
    <section id="slider">
      {slides.map((slide) => (
        <input
          key={slide.id}
          type="radio"
          name="slider"
          id={slide.htmlFor}
          defaultChecked={slide.checked}
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
