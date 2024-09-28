import { Link, useLocation, useNavigate } from 'react-router-dom';
import './edit-page.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { EditFormFields } from '../../utils/types';
import { useDispatch, useSelector } from '../../services/store';
import { cardsDataSelector, editCard } from '../../services/slices/cardsSlice';
import { Button, Container, TextField } from '@mui/material';

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
      <Container maxWidth="xl" sx={{bgcolor: "menu", p: 5}}>
        <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
          <TextField
            sx={{width: 400}}
            error={errors.title ? true : false}
            label="Название продукта"
            placeholder="Название продукта"
            type="text"
            helperText={errors.title ? errors.title.message : ''}
            {...register("title", {
              minLength: { value: 3, message: "Слишком короткое название" },
              maxLength: { value: 100, message: "Слишком длинное название" },
            })}
          />
          <TextField
            sx={{width: 400}}
            error={errors.description ? true : false}
            label="Описание продукта"
            placeholder="Описание продукта"
            rows={5}
            multiline
            helperText={errors.description ? errors.description.message : ''}
            {...register("description", {
              minLength: { value: 3, message: "Слишком короткое описание" },
              maxLength: { value: 300, message: "Слишком длинное описание" },
            })}
          />
          <TextField
            sx={{width: 400}}
            error={errors.url ? true : false}
            label="Адрес картинки"
            placeholder="Адрес картинки"
            type="text"
            helperText={errors.url ? errors.url.message : ''}
            {...register("url")}
          />
          {errors.url && (
            <span className="error-text">{errors.url.message}</span>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            size="large"
          >
            {isSubmitting ? "Ожидание..." : "Готово"}
          </Button>
          {errors.root && (
            <span className="error-text">{errors.root.message}</span>
          )}
        </form>
      </Container>
    </main>
  );
};

export default EditPage;