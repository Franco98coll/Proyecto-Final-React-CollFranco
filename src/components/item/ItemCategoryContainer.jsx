import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import ItemList from './ItemList';
import '../../css/category.css';

const ItemCategoryContainer = ({ category }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Agrega un estado para controlar la carga

    useEffect(() => {
        const fetchItems = async () => {
            const itemCollection = collection(db, 'items');
            const q = query(itemCollection, where('category', '==', category));

            try {
                const querySnapshot = await getDocs(q);
                const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setItems(itemsData);
                setIsLoading(false); // Marcar como cargado cuando se completa la carga de datos
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Marcar como cargado en caso de error
            }
        };

        fetchItems();
    }, [category]);

    return (
        <Container className='categorias'>
            {isLoading ? ( // Mostrar el loader si isLoading es verdadero
                <div className="loader-overlay">
                    <div className="loader-container">
                        <img src="https://i.postimg.cc/HkykPSVH/Corona-Black-01.png" alt="Loading..." className="loader-img" />
                    </div>
                </div>
            ) : (
                <Row>
                    {items.length > 0 ? (
                        <ItemList items={items} />
                    ) : (
                        <p>No hay productos en esta categoría.</p>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default ItemCategoryContainer;
