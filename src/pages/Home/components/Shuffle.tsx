import { useEffect, useState } from 'react';
import CardsFeed from './CardsFeed';
import { ICategory } from '../../../models/ICategory';
import { IProduct } from '../../../models/IProduct';
import instance from '../../../axios';

function Shuffle() {
    const [cats, setCats] = useState<ICategory[]>([]);
    const [active, setActive] = useState<string>('all');

    const handleActiveItem = (name: string) => {
        console.log(name);
        setActive(name);
    };

    useEffect(() => {
        instance.get(`/api/home/categories`).then((categories) => {
            const all: ICategory[] = categories.data.data;
            setCats(all);
        });
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-start sm:justify-center gap-x-3 w-full container overflow-x-auto scrollbar-none">
                <div
                    className="flex flex-col items-center w-24 justify-between cursor-pointer"
                    onClick={() => handleActiveItem('all')}
                >
                    <img
                        className="aspect-square size-12 max-w-20 mb-2 md:size-20"
                        src="/assets/shuffle/dark/all.png"
                        alt="all"
                    />
                    <span
                        className={`${
                            'all' == active
                                ? 'bg-main text-mainBlack'
                                : 'text-main'
                        } py-1 px-2 rounded-full text-xs`}
                    >
                        All
                    </span>
                </div>
                {cats.map((item) => (
                    <div
                        key={item.name}
                        className="flex flex-col items-center w-24 justify-between cursor-pointer"
                        onClick={() =>
                            handleActiveItem(item.name.toLocaleLowerCase())
                        }
                    >
                        <img
                            className="aspect-square size-12 max-w-20 mb-2 md:size-20"
                            src={
                                import.meta.env.VITE_BASEURL +
                                '/public/storage/' +
                                item.icon
                            }
                            alt="all"
                        />
                        <span
                            className={`${
                                item.name.toLocaleLowerCase() == active
                                    ? 'bg-main text-mainBlack'
                                    : 'text-main'
                            } py-1 px-2 rounded-full text-xs`}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="felx flex-col">
                {cats.map((cat, idx) => {
                    if (
                        active == 'all' ||
                        active == cat.name.toLocaleLowerCase()
                    )
                        return (
                            <CardsFeed
                                key={idx}
                                title={cat.name}
                                link={`categories/${cat.id}`}
                                products={cat.products as IProduct[]}
                            />
                        );
                })}
            </div>
        </div>
    );
}

export default Shuffle;
