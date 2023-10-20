import React, { useState } from 'react'
import '../../css/App.css'


const ItemCount = ({ cantidad, handleRestar, handleSumar, handleAgregar }) => {

    return (
        <div>
            <div className='alinear-count'>
                <button onClick={handleRestar}>-</button>
                <span>{cantidad}</span>
                <button onClick={handleSumar}>+</button>
            </div>
            <button className='boton-agregar' onClick={handleAgregar}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount