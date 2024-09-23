import { Link, useLocation, useNavigate } from 'react-router-dom';
import './edit-page.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditFormFields } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/store';
import { cardsDataSelector, editCard } from '../../services/slices/cardsSlice';

const EditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const currentTabId = location.pathname.toString().replace(/\D/g, '');
  const productsDataArray = useSelector(cardsDataSelector);
  const currentProductData = productsDataArray.filter((item) => item.id === +currentTabId);

  if (currentProductData.length === 0) {
    navigate('/products/');
  }

  const {title, body, url, id } = currentProductData[0];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditFormFields>({
    defaultValues: {
      id: id,
      title: `${title}`,
      description: `${body}`,
      url: `${url}`
    }
  });

  const submit: SubmitHandler<EditFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Имитация ожидания ответа от сервера
      dispatch(editCard(data))
      navigate(`/products/${currentTabId}`)
    } catch (error) {
      setError("root", {
        message: `Ошибка: ${error}`,
      });
    }
  };

  return (
    <main>
      <div className="title-block">
        <Link to={`/products/${currentTabId}`} className="link" aria-label="Вернуться к продукту">
          <button type="button" className="button back-button"></button>
        </Link>
        <h2 className="title-main">Редактирование продукта</h2>
      </div>
      <div className="container">
        <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
          <label className='text'>Название продукта</label>
          <input
            className="create-input"
            placeholder="Название продукта"
            type="text"
            {...register("title", {
              minLength: { value: 3, message: "Слишком короткое название" },
              maxLength: { value: 100, message: "Слишком длинное название" },
            })}
          />
          {errors.title && (
            <span className="error-text">{errors.title.message}</span>
          )}
          <label className='text'>Описание продукта</label>
          <textarea
            className="create-input desc-input"
            placeholder="Описание продукта"
            {...register("description", {
              minLength: { value: 3, message: "Слишком короткое описание" },
              maxLength: { value: 300, message: "Слишком длинное описание" },
            })}
          />
          {errors.description && (
            <span className="error-text">{errors.description.message}</span>
          )}
          <label className='text'>Ссылка на картинку продукта</label>
          <input
            className="create-input"
            placeholder="Адрес картинки"
            type="text"
            {...register("url")}
          />
          {errors.url && (
            <span className="error-text">{errors.url.message}</span>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="button create-button"
          >
            {isSubmitting ? "Ожидание..." : "Готово"}
          </button>
          {errors.root && (
            <span className="error-text">{errors.root.message}</span>
          )}
        </form>
      </div>
    </main>
  );
};

export default EditPage;