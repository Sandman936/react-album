import { useState } from "react";
import { cardsDataSelector, cardsStatusSelector, deleteCard, toggleLikeOnCard } from "../../services/slices/cardsSlice";
import { useDispatch, useSelector } from "../../services/store";
import Card from "../card/card";
import { Preloader } from "../preloader/preloader";
import SearchOptions from "../search-options/search-options";
import './products.css'

const Products = () => {
  const dispatch = useDispatch();
  const loadingProductsStatus = useSelector(cardsStatusSelector);
  const productsDataArray = useSelector(cardsDataSelector);
  const isProductsLoading = loadingProductsStatus !== "Success";

  const [likedOnly, setLikedOnly] = useState<boolean>(false);

  const productsArray = likedOnly ? productsDataArray.filter((product) => product.isLiked === true) : productsDataArray;
  
  const handleLikedOnlyChange = () => {
    setLikedOnly(!likedOnly);
  }

  return (
    <main>
      <SearchOptions likedOnlyState={likedOnly} handleLikedOnly={handleLikedOnlyChange}/>
      <div className="container">
        {isProductsLoading ? (
          <Preloader />
        ) : (
          productsArray.map((cardItem) => (
            <Card
              id={cardItem.id}
              url={cardItem.url}
              title={cardItem.title}
              text={cardItem.body}
              isLiked={cardItem.isLiked}
              key={cardItem.id}
              onLikeClick={() => {
                dispatch(toggleLikeOnCard(cardItem.id));
              }}
              onDeleteClick={() => {
                dispatch(deleteCard(cardItem.id));
              }}
            />
          ))
        )}
        {productsArray.length === 0 && (<p className="text-main">По данному фильтру не найдено ни одного товара</p>)}
      </div>
    </main>
  );
};

export default Products;