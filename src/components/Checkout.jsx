import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/config';
import Modal from 'react-modal';
import '../css/checkout.css'

const Checkout = ({ isOpen, onClose, onBuy, item, cantidad }) => {
    const [pedidoId, setPedidoId] = useState(null); // Cambia el estado inicial de pedidoId a null
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext); // Agrega vaciarCarrito al contexto
    const { register, handleSubmit } = useForm();



    const comprar = async (data) => {
        const pedido = {
            cliente: data,
            productos: carrito,
            total: precioTotal(),
        };

        const pedidosRef = collection(db, 'pedidos');

        try {
            const docRef = await addDoc(pedidosRef, pedido);
            setPedidoId(docRef.id);
        } catch (error) {
            console.error('Error al almacenar el pedido:', error);
        }

        const whatsappMessage = generarMensaje(pedido);
        enviarMensajeWhatsApp(whatsappMessage);
        vaciarCarrito();
    };

    const enviarMensajeWhatsApp = (mensaje) => {
        const phoneNumber = '5492645314759'; // Número de WhatsApp de destino
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${mensaje}`;

        // Abrir el enlace de WhatsApp en una nueva ventana.
        window.open(whatsappLink, '_blank');
    };

    const generarMensaje = (pedido) => {
        let message = '¡Quiero comprar los siguientes elementos! ';
        let precioTotal = 0;

        pedido.productos.forEach((prod) => {
            const tituloProducto = prod.title.replace('%20');
            message += `${tituloProducto} x ${prod.cantidad} unidades - `;
            const precioProducto = prod.price * prod.cantidad;
            precioTotal += precioProducto;
        });

        if (item) {
            const tituloItem = item.title.replace(' ', '%20');
            const precioItem = item.price * cantidad;
            message += `${tituloItem} x ${cantidad} unidades - ${precioItem} - `;
        }

        message += `Precio Total: $${(precioTotal + (item ? item.price * cantidad : 0)).toFixed(2)}`;
        return encodeURIComponent(message);
    };

    return (
        <div>
            {/* Modal de Checkout */}
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Formulario de Checkout"
            >
                <div className="checkout-modal">
                    <button className='btn-cerrar' onClick={onClose}>x</button>
                    <h2>Finalizar compra</h2>
                    {pedidoId ? ( // Mostrar el mensaje de agradecimiento si pedidoId tiene un valor
                        <div className='agradecimiento'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42R-TinUGpG7QY6_HODcNh3iNeaik-NDgUQ&usqp=CAU" alt="" />
                            <p>¡Muchas gracias por tu compra!</p>
                            <p>Tu número de pedido es: {pedidoId}</p>
                        </div>
                    ) : (
                        <div >
                            <form className="checkout-form" onSubmit={handleSubmit(comprar)}>
                                <label htmlFor="nombre">Nombre Completo</label>
                                <input type="text" placeholder="Nombre" {...register('nombre', { required: true })} />
                                <label htmlFor="email">Correo electrónico</label>
                                <input type="email" placeholder="Correo electrónico" {...register('email', { required: true })} />
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="tel" placeholder="Teléfono" {...register('telefono', { required: true })} />
                                <button type="submit">Comprar</button>
                            </form>
                            <p className='resumen'>Resumen del carrito:</p>
                            <ul>
                                {carrito.map((producto) => (
                                    <li key={producto.id}>
                                        {producto.title} x {producto.cantidad} - ${producto.price * producto.cantidad}
                                    </li>
                                ))}
                                {item ? (
                                    <li>
                                        {item.title} x {cantidad} - ${item.price * cantidad}
                                    </li>
                                ) : null}
                            </ul>
                            <p className='total-check'>Total: ${precioTotal() + (item ? item.price * cantidad : 0)}</p>

                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Checkout;
