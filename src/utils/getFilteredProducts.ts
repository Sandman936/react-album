import { CardItem } from "./types";

type GetFilteredProductsProps = {
  likedOnlyState: boolean,
  searchValueState: string,
  productsArray: CardItem[],
}

const getFilteredProducts = (props: GetFilteredProductsProps) => {
  const { likedOnlyState, searchValueState, productsArray} = props;

  console.log("Сортировка отработала");

  const likedProductsArray = likedOnlyState
    ? productsArray.filter((product) => product.isLiked === true)
    : productsArray;

  const searchedProductsArray = searchValueState
    ? likedProductsArray.filter((product) =>
        product.title.toLowerCase().includes(searchValueState.toLowerCase())
      )
    : likedProductsArray;
  return searchedProductsArray;
};

export default getFilteredProducts;

