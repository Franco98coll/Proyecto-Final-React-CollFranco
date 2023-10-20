import React, { useContext } from 'react'
import ItemCount from './ItemCount';
import { useState } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../css/itemDetail.css';


const ItemDetail = ({ item }) => {

    const context = useContext(CartContext);
    const carrito = context.carrito;
    const agregarAlCarrito = context.agregarAlCarrito;

    console.log(carrito)

    const [cantidad, setCantidad] = useState(1)

    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < item.stock && setCantidad(cantidad + 1)
    }
    const cuotas = item.price / 6
    const descuento = cuotas.toFixed(2)

    const message = `¡Quiero comprar los siguientes elementos! ${item.title} x ${cantidad} unidades.`;

    const whatsappLink = `https://wa.me/5492645314759?text=${encodeURIComponent(message)}`;

    const comprar = () => {
        window.location.href = whatsappLink;
    }



    return (
        <div className='color'>
            <div className='alinear'>
                <img className='img-productos' src={item.image} alt="" />
                <div className='info-prod'>
                    <h5>{item.title}</h5>
                    <div className='centrar'>
                        <h6>
                            Precio: ${item.price}
                        </h6>
                        <span className='cuotas'>o</span>
                        <span className='cuotas'>$ {descuento} en 6 cuotas sin interés</span>
                    </div>
                    <p>
                        Stock: {item.stock}
                    </p>

                    <ItemCount
                        cantidad={cantidad}
                        handleRestar={handleRestar}
                        handleSumar={handleSumar}
                        handleAgregar={() => { agregarAlCarrito(item, cantidad) }} />
                    <button className='comprar' onClick={comprar}>Comprar</button>
                </div>

            </div>

        </div>


    )
}

export default ItemDetail