import './css/App.css'
import Navbar from './components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Cart from './pages/Cart';
import Producto from './pages/Producto';
import Category from './pages/Category';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Footer from './components/FOOTER/Footer';







function App() {

  return (
    <>

      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/category/:category" element={<Category />} />
        </Routes>
        <ToastContainer />

      </CartProvider>
      <Footer />
    </>
  )
}

export default App
