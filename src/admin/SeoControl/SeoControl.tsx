import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import instance from '../../axios/index';
import Spinner from '../../utils/Spinner';

function SeoControl() {
    const { register, handleSubmit, setValue } = useForm<any>();
    const [loading, setLoading] = useState(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;

    const [pages, setPages] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<number>(1);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/api/admin/page', {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                });
                setPages(response.data.data);
                response.data.data.forEach((page: any) => {
                    setValue(`title-${page.id}`, page.title);
                    setValue(`content-${page.id}`, page.content);
                    setValue(
                        `tags-${page.id}`,
                        Array.isArray(page.tags)
                            ? page.tags.join(', ')
                            : JSON.parse(page.tags).join(', ')
                    );
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPages();
    }, [adminToken, setValue]);

    const onSubmit = async (data: any, pageId: number) => {
        try {
            setLoading(true);
            const title = pageId === 3 ? 'Category' : data[`title-${pageId}`];
            await instance.post(
                `/api/admin/page/update`,
                {
                    page_id: pageId,
                    title: title,
                    content: data[`content-${pageId}`],
                    tags: data[`tags-${pageId}`]
                        .split(',')
                        .map((tag: string) => tag.trim()),
                },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );
        } catch (error) {
            console.error(`Failed to update page ${pageId}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const getPageTitle = (pageId: number) => {
        switch (pageId) {
            case 1:
                return 'Home';
            case 2:
                return 'About';
            case 3:
                return 'Category';
            case 4:
                return 'Categories';
            case 5:
                return 'Policy';
            case 6:
                return 'Terms';
            default:
                return 'Page';
        }
    };

    return (
        <div className="flex flex-col container py-5 px-2 bg-[#1F1F1F]">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="flex justify-between mb-6">
                        <span className="ps-3 border-mainLightColor border-s-4 font-medium">
                            SEO Control
                        </span>
                    </div>
                    <div className="flex mb-4 border-b border-gray-200">
                        {pages.map((page) => (
                            <button
                                key={page.id}
                                className={`py-2 px-4 focus:outline-none ${
                                    activeTab === page.id
                                        ? 'border-b-2 border-blue-500'
                                        : ''
                                }`}
                                onClick={() => setActiveTab(page.id)}
                            >
                                {getPageTitle(page.id)}
                            </button>
                        ))}
                    </div>
                    {pages.map((page) => (
                        <div
                            key={page.id}
                            style={{
                                display:
                                    activeTab === page.id ? 'block' : 'none',
                            }}
                        >
                            <form
                                onSubmit={handleSubmit((data) =>
                                    onSubmit(data, page.id)
                                )}
                                className="flex flex-col items-start gap-3 w-full mb-5"
                            >
                                <h2 className="mx-auto w-fit border-b-[1px] p-5">
                                    {getPageTitle(page.id)}
                                </h2>
                                {page.id !== 3 && (
                                    <div className="flex flex-col grow w-full">
                                        <label className="text-main flex flex-col font-semibold gap-y-2 w-full">
                                            Title
                                            <input
                                                {...register(
                                                    `title-${page.id}`
                                                )}
                                                type="text"
                                                className="border border-gray-400 rounded-md bg-transparent p-1"
                                            />
                                        </label>
                                    </div>
                                )}
                                <div className="flex flex-col grow w-full">
                                    <label className="text-main flex flex-col font-semibold gap-y-2 w-full">
                                        Content
                                        <input
                                            {...register(`content-${page.id}`)}
                                            type="text"
                                            className="border border-gray-400 rounded-md bg-transparent p-1"
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col grow w-full">
                                    <label className="text-main flex flex-col font-semibold gap-y-2 w-full">
                                        Tags
                                        <textarea
                                            {...register(`tags-${page.id}`)}
                                            className="border border-gray-400 rounded-md bg-transparent p-1"
                                            rows={3}
                                        />
                                        <span className="text-[green]">
                                            Remember to add commas between tags
                                        </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn py-2 !rounded-md px-5 mx-auto my-3"
                                >
                                    {loading
                                        ? 'Editing'
                                        : ` Edit ${getPageTitle(page.id)}`}
                                </button>
                                <hr className=" w-[80%] mx-auto" />
                            </form>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default SeoControl;
