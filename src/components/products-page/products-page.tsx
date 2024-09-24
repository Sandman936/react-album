import { useMemo, useState } from "react";
import { cardsDataSelector, cardsStatusSelector } from "../../services/slices/cardsSlice";
import { useSelector } from "../../services/store";
import { Preloader } from "../preloader/preloader";
import SearchOptions from "../search-options/search-options";
import './products-page.css'
import Products from "../products/products";
import { Pagination } from "../pagination/pagination";
import calculatePagination from "../../utils/calculatePagination";
import getFilteredProducts from "../../utils/getFilteredProducts";

const ProductsPage = () => {
  const loadingProductsStatus = useSelector(cardsStatusSelector);
  const productsDataArray = useSelector(cardsDataSelector);

  const isProductsLoading = loadingProductsStatus !== "Success";

  const [likedOnly, setLikedOnly] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProducts = useMemo(() => {
    return getFilteredProducts({
      likedOnlyState: likedOnly,
      searchValueState: searchValue,
      productsArray: productsDataArray,
    });
  }, [likedOnly, searchValue, productsDataArray]);

  if (filteredProducts.length <= 10 && currentPage !== 1) {
    setCurrentPage(1);
  }

  const currentProductsArray = calculatePagination(
    currentPage,
    filteredProducts
  );

  const handleLikedOnlyChange = () => {
    setLikedOnly(!likedOnly);
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <SearchOptions handleOnSearch={handleOnSearchChange} handleLikedOnly={handleLikedOnlyChange} />
      <div className="container">
        {isProductsLoading ? (
          <Preloader />
        ) : (
          <Products cardsArray={currentProductsArray} />
        )}
        {(filteredProducts.length === 0 && !isProductsLoading) && (<p className="text-main">По данному фильтру не найдено ни одного товара</p>)}
      </div>
      <Pagination sumOfProducts={filteredProducts.length} clickHandler={handlePageChange} currentPage={currentPage}/>
    </main>
  );
};

export default ProductsPage;