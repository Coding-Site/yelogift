import { useEffect, useState } from 'react';
import instance from '../../axios';

export default function TopNav() {
    const [data, setData] = useState<any>('');
    useEffect(() => {
        const fetchTopNav = async () => {
            try {
                const response = await instance.get('/api/advertismant');
                const topNavData = response.data.data[0];
                setData(topNavData);
            } catch (error) {
                console.error('Failed to fetch topnav data:', error);
            }
        };
        fetchTopNav();
    }, []);

    if (!data) return;

    return (
        <div className="w-full bg-[#585858]   p-[8px] flex items-center justify-center">
            <span className="text-wrap break-words	 w-full text-center">
                <a href={data.url || '#'} target="_blank">
                    {data.description}
                </a>
            </span>
        </div>
    );
}
