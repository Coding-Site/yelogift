import { useEffect, useState } from 'react';
import { ISlide } from '../../models/ISlide';
import './Slider.css';
import axios from 'axios';
function Slider() {
//   [
//     {
//         image: 'assets/slider/slide1.png',
//         htmlFor: 's1',
//         id: 'slide1',
//         checked: true,
//     },
//     {
//         image: 'assets/slider/slide2.png',
//         htmlFor: 's2',
//         id: 'slide2',
//         checked: true,
//     },
//     {
//         image: 'assets/slider/slide3.png',
//         htmlFor: 's3',
//         id: 'slide3',
//         checked: true,
//     },
//     {
//         image: 'assets/slider/slide4.png',
//         htmlFor: 's4',
//         id: 'slide4',
//         checked: true,
//     },
//     {
//         image: 'assets/slider/slide5.png',
//         htmlFor: 's5',
//         id: 'slide5',
//         checked: true,
//     },
// ]

    const [slides, setSliedes] = useState<ISlide[]>([]);

    const GoNext = () => {
    
        let activeIndex = slides.findIndex((s) => s.checked);
        const lastIndex = slides.length;
        const modified: ISlide[] = slides.map((sl, idx) => {
            if (idx == activeIndex) {
                return { ...sl, checked: false };
            }
            if (idx == activeIndex + 1) {
                return { ...sl, checked: true };
            }
            return sl;
        });

        setSliedes(modified);
        const elements = Array.from(
            document.getElementsByClassName('slideItem')
        );
        elements.forEach((el: Element, idx: number) => {
            if ((el as HTMLInputElement).checked) {
                activeIndex = idx;
            }
        });

        if (activeIndex == (lastIndex - 1)) {
            activeIndex = 0;
        }
        (elements[activeIndex + 1] as HTMLInputElement)?.click();
    };

    const GoPrev = () => {
        let activeIndex = slides.findIndex((s) => s.checked);
        const lastIndex = slides.length;
        const modified: ISlide[] = slides.map((sl, idx) => {
            if (idx == activeIndex) {
                return { ...sl, checked: false };
            }
            if (idx == activeIndex + 1) {
                return { ...sl, checked: true };
            }
            return sl;
        });

        setSliedes(modified);
        const elements = Array.from(
            document.getElementsByClassName('slideItem')
        );
        elements.forEach((el: Element, idx: number) => {
            if ((el as HTMLInputElement).checked) {
                activeIndex = idx;
            }
        });

        if (activeIndex == 0) {
            activeIndex = lastIndex;
        }
        (elements[activeIndex - 1] as HTMLInputElement)?.click();
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BASEURL}/api/home/sliders`)
            .then((d) => {
                const slidesData: ISlide[] = d.data.data;
                
                for (const [idx, sl] of slidesData.entries()) {
                    const updatedSl = { ...sl, checked: true , htmlFor: 's'+(idx+1), id: 'slide'+(idx+1)};
                    setSliedes((old) => {
                      return [...old, updatedSl]
                    })
                  }
            });

    }, []);
    return (
        <section id="slider" className="relative h-[300px] sm:h-[400px]">
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
                />
            ))}
            {slides.map((slide) => (
                <label key={slide.id} htmlFor={slide.htmlFor} id={slide.id}>
                    <img
                        src={import.meta.env.VITE_BASEURL + '/storage/' + slide.image}
                        className="w-[100px] sm:w-[300px] lg:w-full h-[150px] sm:h-[500px] lg:h-full"
                        alt={slide.id}
                    />
                </label>
            ))}
        </section>
    );
}

export default Slider;
