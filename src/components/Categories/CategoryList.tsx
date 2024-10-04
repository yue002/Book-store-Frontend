import React from 'react';
import useFetch from '../../hooks/useFetch';

interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const { data: categories, loading, error } = useFetch<Category[]>('/categories'); // กำหนดประเภทเป็นอาร์เรย์ของ Category

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Categories</h2>
      {categories?.map((category) => ( // ตรวจสอบว่า categories ไม่เป็น undefined
        <div key={category.id}>
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;

