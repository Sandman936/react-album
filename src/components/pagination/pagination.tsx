import { productsPerPage } from '../../constants/constants';
import './pagination.css'

type PaginationProps = {
    sumOfProducts: number;
    currentPage: number;
    clickHandler: (arg0: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { sumOfProducts, clickHandler, currentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(sumOfProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) {
    return null
  }

  return (
    <div className="pagination-wrapper">
      {pageNumbers.map((number) => (
        <button
          className="button pagination-button"
          key={number}
          onClick={() => clickHandler(number)}
          disabled={currentPage === number}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
