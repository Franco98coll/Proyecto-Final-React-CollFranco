import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(carritoInicial);

    const agregarAlCarrito = (item, cantidad) => {
        const itemAgregado = { ...item, cantidad };
        const nuevoCarrito = [...carrito];
        const estaEnElCarrito = carrito.find((producto) => producto.id === itemAgregado.id);

        if (estaEnElCarrito) {
            const stockDisponible = estaEnElCarrito.stock - estaEnElCarrito.cantidad;

            if (cantidad <= stockDisponible) {
                estaEnElCarrito.cantidad += cantidad;
                setCarrito(nuevoCarrito);
                // Mostrar notificación Toastify de éxito
                toast.success('Producto agregado al carrito', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500, // Duración de 3 segundos (3000 ms)
                });
            } else {
                toast.error('No hay suficiente stock disponible para este producto.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
        } else {
            if (cantidad <= itemAgregado.stock) {
                nuevoCarrito.push(itemAgregado);
                setCarrito(nuevoCarrito);
                // Mostrar notificación Toastify de éxito
                toast.success('Producto agregado al carrito', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500, // Duración de 3 segundos (3000 ms)
                });
            } else {
                toast.error('No hay suficiente stock disponible para este producto.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            }
        }
    };

    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    };

    const precioTotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
    };

    const eliminarDelCarrito = (id) => {
        const productoAEliminar = carrito.find((prod) => prod.id === id);
        if (productoAEliminar) {
            if (productoAEliminar.cantidad > 1) {
                const nuevoCarrito = carrito.map((prod) => {
                    if (prod.id === id) {
                        return { ...prod, cantidad: prod.cantidad - 1 };
                    }
                    return prod;
                });
                setCarrito(nuevoCarrito);
            } else {
                const nuevoCarrito = carrito.filter((prod) => prod.id !== id);
                setCarrito(nuevoCarrito);
            }
        }
    };
    const vaciarCarrito = () => {
        setCarrito([]);
    }

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    return (
        <CartContext.Provider value={{ carrito, agregarAlCarrito, cantidadEnCarrito, precioTotal, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </CartContext.Provider>
    );
};
