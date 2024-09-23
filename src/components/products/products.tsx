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
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredProductsArray = searchValue ? productsDataArray.filter((product) => product.title.toLowerCase().includes(searchValue)) : productsDataArray;

  const likedProductsArray = likedOnly ? filteredProductsArray.filter((product) => product.isLiked === true) : filteredProductsArray;
  
  const handleLikedOnlyChange = () => {
    setLikedOnly(!likedOnly);
  }

  const handleOnSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  }

  return (
    <main>
      <SearchOptions handleOnSearch={handleOnSearchChange} handleLikedOnly={handleLikedOnlyChange} />
      <div className="container">
        {isProductsLoading ? (
          <Preloader />
        ) : (
          likedProductsArray.map((cardItem) => (
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
        {(likedProductsArray.length === 0 && !isProductsLoading) && (<p className="text-main">По данному фильтру не найдено ни одного товара</p>)}
      </div>
    </main>
  );
};

export default Products;