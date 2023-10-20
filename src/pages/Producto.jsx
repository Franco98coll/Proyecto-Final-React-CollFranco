import React from 'react'
import ItemDetailContainer from '../components/item/ItemDetailContainer'
import { useParams } from 'react-router-dom'
import '../css/App.css'


const Producto = () => {
  const { id } = useParams()

  return (
    <div className='prducto'>
      <ItemDetailContainer id={id} />
    </div>
  )
}

export default Producto