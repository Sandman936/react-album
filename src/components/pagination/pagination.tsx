import { Pagination } from '@mui/material';
import { productsPerPage } from '../../constants/constants';
import './pagination.scss'

type PaginationProps = {
    sumOfProducts: number;
    currentPage: number;
    clickHandler: (arg0: number) => void;
}

const PaginationList = (props: PaginationProps) => {
  const { sumOfProducts, clickHandler, currentPage } = props;
  const pageNumbersCount = Math.ceil(sumOfProducts / productsPerPage);

  if (pageNumbersCount <= 1) {
    return null;
  }

  return (
      <Pagination
        count={pageNumbersCount}
        size="large"
        color="secondary"
        className="pagination-wrapper"
        onChange={(_e, page) => clickHandler(page)}
        page={currentPage}
      />
  );
};

export default PaginationList;
