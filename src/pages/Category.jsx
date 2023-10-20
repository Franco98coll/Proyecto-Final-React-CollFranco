import React from 'react';
import ItemCategoryContainer from '../components/item/ItemCategoryContainer';
import { useParams } from 'react-router-dom';
import '../css/category.css'

const Category = () => {
    const { category } = useParams();

    // Reemplaza los guiones con espacios y capitaliza la primera letra de cada palabra
    const categoriaFormateada = category.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return (
        <div className='categoria'>
            <h2 className='centrar'>{categoriaFormateada}</h2>
            <ItemCategoryContainer category={category} />
        </div>
    );
}



export default Category;

