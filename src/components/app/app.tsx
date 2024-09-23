import { FC, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from '../products/products'
import { useDispatch } from '../../services/store'
import { getProductData, getProductImages } from '../../services/thunks'
import Product from '../product/product'
import CreatePage from '../create-page/create-page'

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getProductImages())
      .then(() => dispatch(getProductData()))
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to='/products' />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/create-product" element={<CreatePage />} />
    </Routes>
  );
}

export default App
