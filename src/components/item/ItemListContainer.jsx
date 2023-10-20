import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemList from './ItemList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import '../../css/App.css';


const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const itemCollection = collection(db, 'items');

        getDocs(itemCollection)
            .then((snapshot) => {
                const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setItems(allData);
                setIsLoading(false); // Marcar como cargado cuando se completa la carga de datos
            })
            .catch((error) => {
                console.error('Error fetching items:', error);
            });
    }, []);

    return (
        <Container>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader-container">
                        <img src="https://i.postimg.cc/HkykPSVH/Corona-Black-01.png" alt="Loading..." />
                    </div>
                </div>
            )}
            <Row>
                {items.length > 0 && <ItemList items={items} />}
            </Row>
        </Container>
    );
};

export default ItemListContainer;
