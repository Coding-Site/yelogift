import { useEffect, useState } from 'react';
import instance from '../../axios';

export default function TopNav() {
    const [data, setData] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTopNav = async () => {
            try {
                const response = await instance.get('/api/advertismant');
                const topNavData = response.data.data;
                setData(topNavData);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
            }
        };
        fetchTopNav();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === data.length - 1 ? 0 : prevIndex + 1
            );
        }, 3500);

        return () => clearInterval(interval);
    }, [data]);

    if (!data.length) return null;

    const currentItem = data[currentIndex];

    return (
        <div
            className="w-full p-[8px] flex items-center justify-center"
            style={{
                backgroundColor: currentItem.color1 || 'transparent',
                color: currentItem.color2 || 'transparent',
                transition: 'background-color 0.5s, color 0.5s',
            }}
        >
            <span
                className="text-wrap break-words w-full text-center"
                style={{
                    animation: 'fadeIn 1s',
                }}
            >
                <a href={currentItem.url || '#'} target="_blank">
                    {currentItem.description}
                </a>
            </span>
        </div>
    );
}
