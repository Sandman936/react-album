import { FC, useEffect } from 'react'
import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProductsPage from '../products-page/products-page'
import { useDispatch } from '../../services/store'
import { getProductData} from '../../services/thunks'
import Product from '../product/product'
import CreatePage from '../create-page/create-page'
import EditPage from '../edit-page/edit-page'
import Header from '../header/header'

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/places" />} />
        <Route path="/places" element={<ProductsPage />} />
        <Route path="/place/:id" element={<Product />} />
        <Route path="/create-product" element={<CreatePage />} />
        <Route path="/place/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App
