import React from 'react';
import { Col } from 'react-bootstrap';
import CardItem from './CardItem';

const ItemList = ({ items, categoryFilter }) => {
    // Verifica si categoryFilter está definida antes de filtrar
    const filteredItems = categoryFilter ? items.filter(item => item.category === categoryFilter) : items;

    return (
        <>
        {filteredItems.map((item) => {
            return(
                <Col md={4} lg={4}  key={item.id}>
                    <CardItem item={item}/>
                </Col>
            )
        })}
        </>
    );
}

export default ItemList;
