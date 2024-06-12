import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import instance from '../../../axios';
import Spinner from '../../../utils/Spinner';

interface TableProps {
    id: number;
    adminToken: string;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const Table: React.FC<TableProps> = ({ id, adminToken }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDropping, setIsDropping] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        instance
            .get(`/api/admin/category/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((response: any) => {
                setProducts(response.data.data.products);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [adminToken, id]);

    if (loading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;

    const moveProduct = (dragIndex: number, hoverIndex: number) => {
        const dragProduct = products[dragIndex];
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(dragIndex, 1);
            updatedProducts.splice(hoverIndex, 0, dragProduct);
            return updatedProducts;
        });
    };

    const Product: React.FC<{ product: any; index: number }> = ({
        product,
        index,
    }) => {
        const [{ isDragging }, drag] = useDrag({
            type: 'product',
            item: { index, id: product.id, type: 'product' },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        if (isDropping) {
            return (
                <tr>
                    <td colSpan={4}>Dropping...</td>
                </tr>
            );
        }

        const [, drop] = useDrop({
            accept: 'product',
            hover(item: DragItem) {
                if (item.index !== index) {
                    moveProduct(item.index, index);
                    item.index = index;
                }
            },
            async drop(item: DragItem) {
                setIsDropping(true);
                const { id: productId } = item;
                const updatedProduct = products.find(
                    (product) => product.id === productId
                );
                if (updatedProduct) {
                    try {
                        await instance.put(
                            `/api/admin/product/reorder/category/${productId}`,
                            {
                                category_order: index + 1,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${adminToken}`,
                                },
                            }
                        );
                        console.log(
                            `Product ${productId} updated successfully.`
                        );
                    } catch (error: any) {
                        console.error(
                            `Error updating product ${productId}: ${error.message}`
                        );
                    } finally {
                        setIsDropping(false);
                    }
                }
            },
        });

        return (
            <tr
                ref={(node) => drag(drop(node))}
                style={{ opacity: isDragging || isDropping ? 0.5 : 1 }}
            >
                <td>:::</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">
                    <img
                        className="w-12 h-12 mx-auto"
                        src={`${import.meta.env.VITE_BASEURL}/public/storage/${
                            product.image
                        }`}
                        alt={product.name}
                    />
                </td>
                <td className="p-3">{product.id}</td>
            </tr>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="text-[#000]">
                <table className="w-full text-center">
                    <thead>
                        <tr>
                            <th className="p-3">move</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <Product
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </DndProvider>
    );
};

export default Table;
