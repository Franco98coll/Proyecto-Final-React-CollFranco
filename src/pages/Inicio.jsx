import React from 'react'
import Carrusel from '../components/Carrusel'
import ItemListContainer from '../components/item/ItemListContainer'
import '../css/index.css'

const Inicio = () => {
  return (
    <div className='background'>
      <Carrusel />
      <ItemListContainer />
    </div>
  )
}

export default Inicio