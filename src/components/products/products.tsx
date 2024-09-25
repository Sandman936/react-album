import { deleteCard, toggleLikeOnCard } from '../../services/slices/cardsSlice';
import { useDispatch } from '../../services/store';
import { CardItem } from '../../utils/types';
import Card from '../card/card';
import './products.scss'

type productsProps = {
    cardsArray: CardItem[],
}

const Products = (props: productsProps) => {
  const dispatch = useDispatch();

  const {cardsArray} = props;

  return cardsArray.map((cardItem) => (
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
  ));
};

export default Products;