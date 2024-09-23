
import { Link, Navigate, useLocation } from 'react-router-dom';
import './product.css'
import { useSelector } from '../../services/store';
import { cardsDataSelector } from '../../services/slices/cardsSlice';

const Product = () => {
  const location = useLocation();
  const currentTabId = location.pathname.toString().replace(/\D/g, '');
  const productsDataArray = useSelector(cardsDataSelector);
  const currentProductData = productsDataArray.filter((item) => item.id === +currentTabId);

  if (currentProductData.length === 0) {
    return <Navigate replace to='/products' />
  }
  
  const {title, body, url } = currentProductData[0];

  return (
    <main>
      <div className="title-block">
        <Link to={"/products"} className="link" aria-label="Перейти к странице продуктов">
          <button type="button" className="button home-button"></button>
        </Link>
        <h2 className="title-main">Информация о продукте</h2>
      </div>
      <div className="container info">
        <h3 className="sub-title-main">{title}</h3>
        <div className="info-wrapper">
          <div className="image-container-main">
            <img className="image" src={url} alt={title} />
          </div>
          <p className="text-main">{body}</p>
        </div>
      </div>
    </main>
  );
}

export default Product;