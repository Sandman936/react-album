import { Link } from 'react-router-dom';
import './search-options.css'

type SearchOptionsProps = {
    likedOnlyState: boolean;
    handleLikedOnly: () => void;
}

const SearchOptions = (props: SearchOptionsProps) => {
  const { likedOnlyState, handleLikedOnly } = props;

  return (
    <div className="search-options">
      <div className="liked-only-option">
        <input type="checkbox" id="likedOnly" name="likedOnly" checked={likedOnlyState} onChange={handleLikedOnly}/>
        <label htmlFor="likedOnly">Показать только понравившиеся</label>
      </div>
      <Link className='link' to={'/create-product'}><button className='button add-button'/></Link>
    </div>
  );
};

export default SearchOptions;