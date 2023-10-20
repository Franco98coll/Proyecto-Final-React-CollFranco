import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import '../../css/App.css'; // Asegúrate de importar tus estilos CSS

const ItemDetailContainer = ({ id }) => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Agrega un estado para controlar la carga

  useEffect(() => {
    const itemRef = doc(db, 'items', id); // Utilizar la id pasada como prop

    getDoc(itemRef)
      .then((snapshot) => {
        console.log(snapshot.exists());
        if (snapshot.exists()) {
          setItem({ id: snapshot.id, ...snapshot.data() });
        }
        setIsLoading(false); // Marcar como cargado cuando se completa la carga de datos
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Marcar como cargado en caso de error
      });
  }, [id]);

  console.log(item);

  return (
    <>
      {isLoading ? ( // Mostrar el loader si isLoading es verdadero
        <div className="loader-overlay">
          <div className="loader-container">
            <img src="https://i.postimg.cc/HkykPSVH/Corona-Black-01.png" alt="Loading..." className="loader-img" />
          </div>
        </div>
      ) : (
        item !== null && <ItemDetail item={item} />
      )}
    </>
  );
};

export default ItemDetailContainer;
