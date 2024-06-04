import { useEffect, useState } from 'react';
import instance from '../../axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './Slider.css';

export default function Slider() {
    const [sliderData, setSliderData] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        instance
            .get(`/api/home/sliders`)
            .then((d) => setSliderData(d.data.data))
            .catch((error) => {
                console.error('Error fetching sliders:', error);
            });
    }, []);

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    const ensureAbsoluteUrl = (url: string) => {
        if (!url) return '#';
        return url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `http://${url}`;
    };

    return (
        <>
            <div className="slider_container">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    onSlideChange={handleSlideChange}
                >
                    {sliderData.map((slide: any, index: any) => (
                        <SwiperSlide key={index}>
                            <a
                                href={ensureAbsoluteUrl(slide.link) || '#'}
                                className="h-[50vh] a_slider_img"
                            >
                                <img
                                    src={
                                        import.meta.env.VITE_BASEURL +
                                        '/public/storage/' +
                                        slide.image
                                    }
                                    className="slider_img"
                                    alt={slide.description}
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {sliderData.length > 0 && (
                <div className="flex flex-col gap-7 relative mt-5 sm:mt-10">
                    <div className="text-lg text-main font-semibold text-center px-5 mb-14 sm:mb-0">
                        {sliderData[activeIndex]?.title || 'Default Title'}
                    </div>
                    <div className="text-sm hidden sm:flex sm:justify-center text-mainWhite w-[80%] mx-auto font-extralight text-center">
                        <p className="text-center">
                            {sliderData[activeIndex]?.description ||
                                'Default Description'}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
