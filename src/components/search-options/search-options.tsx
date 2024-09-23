import { Link } from 'react-router-dom';
import './search-options.css'

type SearchOptionsProps = {
    handleOnSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLikedOnly: () => void;
}

const SearchOptions = (props: SearchOptionsProps) => {
  const { handleOnSearch, handleLikedOnly } = props;

  return (
    <div className="search-options">
      <div className="liked-only-option">
        <input
          type="checkbox"
          id="likedOnly"
          name="likedOnly"
          onChange={handleLikedOnly}
        />
        <label htmlFor="likedOnly">Показать только понравившиеся</label>
      </div>
      <div className='search-value'>
        <label>Поиск:</label>
        <input type="search" className='search-input' onChange={handleOnSearch}/>
      </div>
      <Link className="link" to={"/create-product"}>
        <button className="button add-button" />
      </Link>
    </div>
  );
};

export default SearchOptions;