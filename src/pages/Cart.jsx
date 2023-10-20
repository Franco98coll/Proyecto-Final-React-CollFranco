import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Checkout from '../components/Checkout';



const Cart = () => {
  const { carrito, precioTotal, eliminarDelCarrito } = useContext(CartContext);
  const { register, handleSubmit } = useForm();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [pedidoId, setPedidoId] = useState('');

  const handleEliminar = (id) => {
    eliminarDelCarrito(id);
  };

  const comprar = (data) => {
    // Lógica para procesar la compra y almacenarla en la base de datos (similar a tu código existente).

    // Ejemplo: Almacenar la compra en Firestore y obtener el ID del pedido
    const pedido = {
      cliente: data,
      productos: carrito,
      total: precioTotal(),
    };

    const pedidosRef = collection(db, 'pedidos');

    addDoc(pedidosRef, pedido)
      .then((doc) => {
        setPedidoId(doc.id); // Establecer el ID del pedido
        vaciarCarrito(); // Vaciar el carrito después de completar la compra

        // Verificar si se debe enviar el mensaje de WhatsApp
        if (carrito.length > 0) {
          const mensaje = generarMensaje();
          enviarMensajeWhatsApp(mensaje);
        }
      })
      .catch((error) => {
        console.error('Error al almacenar el pedido:', error);
      });

    setIsCheckoutOpen(false);
  };

  const generarMensaje = () => {
    let message = '¡Quiero comprar los siguientes elementos! ';
    let precioTotal = 0;

    carrito.forEach((prod) => {
      const tituloProducto = prod.title.replace(' ', '%20');
      message += `${tituloProducto} x ${prod.cantidad} unidades - `;

      const precioProducto = prod.price * prod.cantidad;
      precioTotal += precioProducto;
    });

    message += `Precio Total: $${precioTotal.toFixed(2)}`;

    return encodeURIComponent(message);
  };

  const enviarMensajeWhatsApp = (mensaje) => {
    // Abre WhatsApp en una nueva pestaña
    const phoneNumber = '5492645314759';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${mensaje}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className='carrito'>
      {carrito.map((prod) => (
        <div key={prod.id}>
          <div className='alinear-carrito'>
            <img className='imagencarrito' src={prod.image} alt={prod.title} />
            <div className='titulo-carrito'>
              <h3>{prod.title}</h3>
            </div>
            <div className='precio-cantidad'>
              <p>Precio Unitario: ${prod.price}</p>
              <p>Cantidad: {prod.cantidad}</p>
            </div>
            <h5 className='total-producto'>Precio Total: ${prod.price * prod.cantidad}</h5>
            <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
          </div>
          <br />
        </div>
      ))}
      <div>
        {carrito.length > 0 ? (
          <div className='alinear-total'>
            <h3>Precio Total: ${precioTotal()}</h3>
            <button onClick={() => setIsCheckoutOpen(true)}>Comprar</button>
          </div>
        ) : (
          <div className='no-hay'>
            <h3>No hay productos en el carrito</h3>
          </div>
        )}
      </div>

      {isCheckoutOpen && (
        <Checkout isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} comprar={comprar} />
      )}

      {pedidoId && (
        <div className='order-confirmation'>
          <h2>¡Gracias por tu compra!</h2>
          <p>Tu número de pedido es: {pedidoId}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
