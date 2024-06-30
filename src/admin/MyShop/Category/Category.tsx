import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import Spinner from '../../../utils/Spinner';
import instance from '../../../axios';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface CategoryItemProps {
    category: {
        id: number;
        name: string;
        icon: string;
    };
    index: number;
}

function Category() {
    const [loading, setLoading] = useState<boolean>(false);
    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );
    const adminToken = localstorage?.adminToken;
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryItemProps[]>([]);
    const [isDropping, setIsDropping] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        setLoading(true);
        instance
            .get(`/api/admin/category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then(() => {
                setLoading(false);
                navigate(0);
            });
    };

    const moveCategory = async (dragIndex: number, hoverIndex: number) => {
        const dragCategory: any = categories[dragIndex];
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            updatedCategories.splice(dragIndex, 1);
            updatedCategories.splice(hoverIndex, 0, dragCategory);
            return updatedCategories;
        });
    };

    const reorderCategory = async (categoryId: number, newIndex: number) => {
        setIsDropping(true);

        try {
            const req = await instance.put(
                `/api/admin/category/reorder/${categoryId}`,
                {
                    order: newIndex + 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );
            console.log(req);
        } catch (error: any) {
            console.error(`Error reordering category ${categoryId}: ${error}`);
        } finally {
            setIsDropping(false);
        }
    };

    const CategoryItem = ({ category, index }: CategoryItemProps) => {
        const [, drag] = useDrag({
            type: 'category',
            item: { index, id: category.id, type: 'category' },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'category',
            hover(item: any) {
                if (item.index !== index) {
                    moveCategory(item.index, index);
                    item.index = index;
                }
            },
            async drop(item: any) {
                await reorderCategory(item.id, index);
            },
        });

        if (isDropping) {
            return (
                <tr>
                    <td colSpan={4}>Dropping...</td>
                </tr>
            );
        }

        return (
            <tr ref={(node) => drag(drop(node))}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                    <img
                        className="size-10 mx-auto"
                        src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                            category.icon
                        }`}
                        alt=""
                    />
                </td>
                <td>
                    <FaRegTrashAlt
                        className="mx-auto text-3xl cursor-pointer"
                        onClick={() => handleDelete(category.id)}
                    />
                </td>
            </tr>
        );
    };

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/category`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => {
                setCategories(data.data.data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full py-5 container">
            <div className="flex items-center justify-between w-full pt-10 pb-5 ">
                <span className="text-3xl text-white font-semibold">
                    All Categories
                </span>

                <Link
                    to="/admin/category/add"
                    className="btn !rounded-md !h-12"
                >
                    <AiOutlinePlus /> Add new category
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col gap-2 rounded-t-xl p-4  bg-white text-mainLightBlack">
                    <DndProvider backend={HTML5Backend}>
                        <table className="text-center table-auto">
                            <thead>
                                <tr className="border-y-4 border-transparent">
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cat: any, idx) => (
                                    <CategoryItem
                                        key={cat.id}
                                        category={cat}
                                        index={idx}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </DndProvider>
                </div>
            )}
        </div>
    );
}

export default Category;
