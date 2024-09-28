import { useMemo, useState } from "react";
import { cardsDataSelector, cardsStatusSelector } from "../../services/slices/cardsSlice";
import { useSelector } from "../../services/store";
import { Preloader } from "../preloader/preloader";
import SearchOptions from "../search-options/search-options";
import './products-page.scss'
import Products from "../products/products";
import { Pagination } from "../pagination/pagination";
import calculatePagination from "../../utils/calculatePagination";
import getFilteredProducts from "../../utils/getFilteredProducts";
import { productsPerPage } from "../../constants/constants";

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

  if (filteredProducts.length <= productsPerPage && currentPage !== 1) {
    setCurrentPage(1);
  }

  const currentPageArray = calculatePagination(
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
      <section className="container">
        {isProductsLoading ? (
          <Preloader />
        ) : (
          <Products cardsArray={currentPageArray} />
        )}
        {(filteredProducts.length === 0 && !isProductsLoading) && (<p className="text-main">Не найдено ни одного товара</p>)}
      </section>
      <Pagination sumOfProducts={filteredProducts.length} clickHandler={handlePageChange} currentPage={currentPage}/>
    </main>
  );
};

export default ProductsPage;