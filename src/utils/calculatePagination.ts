import { productsPerPage } from "../constants/constants";
import { CardItem } from "./types";

const calculatePagination = (currentPage: number, array: CardItem[]) => {
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  return array.slice(firstProductIndex, lastProductIndex);
};

export default calculatePagination;

