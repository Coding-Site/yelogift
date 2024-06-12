import { useEffect, useState } from 'react';
import instance from '../../../axios';
import Table from './Table';

export default function SectionOrder() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const localstorage = JSON.parse(
        localStorage.getItem('adminData') as string
    );

    const adminToken = localstorage?.adminToken;

    useEffect(() => {
        instance
            .get(`/api/admin/category`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })
            .then((data) => {
                setCategories(data.data.data);
                setSelectedCategory(data.data.data[0]);
            });
    }, [adminToken]);

    const handleTabClick = (category: any) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="p-4 w-full">
                <div className="flex space-x-4 mb-4">
                    {categories.map((category: any) => (
                        <button
                            key={category.id}
                            onClick={() => handleTabClick(category)}
                            className={`py-2 px-4 border rounded ${
                                selectedCategory &&
                                selectedCategory.id === category.id
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-gray-100 text-black border-gray-300'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="border p-4 bg-white rounded">
                    {selectedCategory && (
                        <div>
                            <h2 className="text-2xl font-bold text-[#000]">
                                {selectedCategory.name}
                            </h2>
                            <Table
                                id={selectedCategory.id}
                                adminToken={adminToken}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
