import { Link } from 'react-router-dom';
import './search-options.scss'
import { Checkbox, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';

type SearchOptionsProps = {
    handleOnSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLikedOnly: () => void;
}

const SearchOptions = (props: SearchOptionsProps) => {
  const { handleOnSearch, handleLikedOnly } = props;

  return (
    <div className="search-options">
      <div className="liked-only-option">
        <Checkbox
          aria-label="Показать только понравившиеся"
          size="medium"
          id="likedOnly"
          name="likedOnly"
          onChange={handleLikedOnly}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
        <span>Показать только понравившиеся</span>
      </div>
      <div className="search-add-wrapper">
        <TextField
          label="Поиск"
          type="search"
          variant="filled"
          onChange={handleOnSearch}
          sx={{ bgcolor: "Window", borderRadius: 2 }}
          className="search-input"
        />
        <Link
          className="link"
          to={"/create-product"}
          aria-label="Добавить продукт"
        >
          <div className="add-container">
            <label className="add-label">Добавить продукт</label>
            <button className="button add-button" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchOptions;