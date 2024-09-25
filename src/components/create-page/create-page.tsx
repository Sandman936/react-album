import { Link, useNavigate } from 'react-router-dom';
import './create-page.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateFormFields } from '../../utils/types';
import { useDispatch } from '../../services/store';
import { addNewCard } from '../../services/slices/cardsSlice';

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateFormFields>();

  const submit: SubmitHandler<CreateFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Имитация ожидания ответа от сервера
      dispatch(addNewCard(data));
      reset({
        title: "",
        description: "",
        url: "",
      });
      navigate('/products/');
    } catch (error) {
      setError("root", {
        message: `Ошибка: ${error}`,
      });
    }
  };

  return (
    <main>
      <div className="title-block">
        <Link to={"/products"} className="link" aria-label="Вернуться к продуктам">
          <button type="button" className="button home-button"></button>
        </Link>
        <h2 className="title-main">Создание продукта</h2>
      </div>
      <div className="container">
        <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
          <input
            className="create-input"
            placeholder="Название продукта"
            type="text"
            {...register("title", {
              required: "Укажите название",
              minLength: { value: 3, message: "Слишком короткое название" },
              maxLength: { value: 25, message: "Слишком длинное название" },
            })}
          />
          {errors.title && (
            <span className="error-text">{errors.title.message}</span>
          )}
          <textarea
            className="create-input desc-input"
            placeholder="Описание продукта"
            {...register("description", {
              required: "Укажите описание продукта",
              minLength: { value: 3, message: "Слишком короткое описание" },
              maxLength: { value: 70, message: "Слишком длинное описание" },
            })}
          />
          {errors.description && (
            <span className="error-text">{errors.description.message}</span>
          )}
          <input
            className="create-input"
            placeholder="Адрес картинки"
            type="text"
            {...register("url", {
              required: "Вставте ссылку на изображение",
            })}
          />
          {errors.url && (
            <span className="error-text">{errors.url.message}</span>
          )}
          <button
            disabled={isSubmitting}
            type="submit"
            className="button create-button"
          >
            {isSubmitting ? "Создаем..." : "Создать"}
          </button>
          {errors.root && (
            <span className="error-text">{errors.root.message}</span>
          )}
        </form>
      </div>
    </main>
  );
};

export default CreatePage;