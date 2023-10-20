import React from 'react'
import Carrusel from '../components/carrusel'
import ItemListContainer from '../components/item/ItemListContainer'
import '../css/index.css'
import Footer from '../components/footer'

const Inicio = () => {
  return (
    <div className='background'>
      <Carrusel />
      <ItemListContainer />
    </div>
  )
}

export default Inicio