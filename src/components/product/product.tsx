import { Link, Navigate, useLocation } from 'react-router-dom';
import './product.scss'
import { useSelector } from '../../services/store';
import { cardsDataSelector } from '../../services/slices/cardsSlice';
import { Button } from '@mui/material';

const Product = () => {
  const location = useLocation();
  const currentTabId = location.pathname.toString().replace(/\D/g, "");
  const productsDataArray = useSelector(cardsDataSelector);
  const currentProductData = productsDataArray.filter(
    (item) => item.id === +currentTabId
  );

  if (currentProductData.length === 0) {
    return <Navigate replace to="/products" />;
  }

  const { title, body, url } = currentProductData[0];

  return (
    <main>
      <div className="title-block">
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
        <Link to={`/products/edit/${currentTabId}`}>
          <Button type="button" variant="contained" size="large">
            Редактировать
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default Product;