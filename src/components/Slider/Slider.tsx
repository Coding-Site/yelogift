import { useEffect, useState } from 'react';
import { ISlide } from '../../models/ISlide';
import './Slider.css';
import instance from '../../axios';
function Slider() {
    const [slides, setSliedes] = useState<ISlide[]>([]);
    const [imagedata, setimagedata] = useState<ISlide>();

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
                setimagedata(slides[activeIndex]);
            }
        });

        if (activeIndex == lastIndex - 1) {
            activeIndex = 0;
            setimagedata(slides[activeIndex]);
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
                setimagedata(slides[activeIndex]);
            }
        });

        if (activeIndex == 0) {
            activeIndex = lastIndex;
        }
        (elements[activeIndex - 1] as HTMLInputElement)?.click();
    };
    useEffect(() => {
        instance.get(`/api/home/sliders`).then((d) => {
            const slidesData: ISlide[] = d.data.data;
            console.log(slidesData);

            for (const [idx, sl] of slidesData.entries()) {
                const updatedSl = {
                    ...sl,
                    checked: true,
                    htmlFor: 's' + (idx + 1),
                    id: 'slide' + (idx + 1),
                };
                console.log(updatedSl);

                setSliedes((old) => {
                    return [...old, updatedSl];
                });
                setimagedata(slidesData[0]);
            }
        });
    }, []);

    return (
        <>
            <section
                id="slider"
                className="relative h-[180px] sm:h-[400px] !mb-16"
            >
                {/* buttom next */}
                <button
                    className="next absolute top-[40%] sm:top-[20%] md:top-[50%]  md:-left-64 -left-20 "
                    onClick={GoNext}
                >
                    <img className="w-5 sm:w-10" src="assets/slider/next.png" />
                </button>
                {/* buttom prev */}
                <button
                    className="prev absolute top-[40%] sm:top-[20%] md:top-[50%] md:-right-64 -right-20 "
                    onClick={GoPrev}
                >
                    <img className="w-5 sm:w-10" src="assets/slider/prev.png" />
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
                            src={
                                import.meta.env.VITE_BASEURL +
                                '/public/storage/' +
                                slide.image
                            }
                            className="w-[100px] sm:w-[300px] lg:w-full h-[150px] sm:h-[500px] lg:h-full"
                            alt={slide.id}
                        />
                    </label>
                ))}
            </section>
            <div className=" flex flex-col gap-7 relative">
                <div className="text-lg text-main font-semibold text-center px-5 mb-14 sm:mb-0">
                    {imagedata?.title}

                    {/* Unlock Endless Gaming Adventures with Steam Gift Cards! */}
                </div>
                <div className="text-lg  hidden sm:flex sm:justify-center text-mainWhite w-[80%] mx-auto font-extralight text-center">
                    <p className=" text-center">{imagedata?.description}</p>
                </div>
                <button className="hidden sm:flex btn mx-auto !h-12 ">
                    {' '}
                    Explore Now
                </button>
            </div>
        </>
    );
}

export default Slider;
