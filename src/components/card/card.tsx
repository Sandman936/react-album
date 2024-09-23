import { FC } from "react"
import './card.css'
import { Link } from "react-router-dom";

type cardProps = {
  id: number,
  url: string,
  title: string,
  text: string,
  isLiked: boolean,
  onLikeClick: () => void,
  onDeleteClick: () => void,
}

const Card: FC<cardProps> = (props: cardProps) => {
  const { id, url, title, text, isLiked, onLikeClick, onDeleteClick} = props;

  return (
    <>
      <div className="card-buttons-wrapper">
        <button
          type="button"
          className={`button like-button ${isLiked && "active"}`}
          onClick={onLikeClick}
        />
        <button
          type="button"
          className="button delete-button"
          onClick={onDeleteClick}
        />

      <Link
        to={`/products/${id}`}
        className="link"
        aria-label="Перейти к товару"
      >
        <article className="card">
          <div className="image-container">
            <img className="image" src={url} alt={title} />
          </div>
          <div className="text-container">
            <h3 className="title">{title}</h3>
            <p className="text">{text}</p>
          </div>
        </article>
      </Link>
      </div>
    </>
  );
}

export default Card