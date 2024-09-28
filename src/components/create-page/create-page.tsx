import { useNavigate } from 'react-router-dom';
import './create-page.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateFormFields } from '../../utils/types';
import { useDispatch } from '../../services/store';
import { addNewCard } from '../../services/slices/cardsSlice';
import { Button, Container, TextField } from '@mui/material';

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
  //fix
  return (
    <main>
      <div className="title-block">
        <h2 className="title-main">Создание продукта</h2>
      </div>
      <Container maxWidth="xl" sx={{bgcolor: "menu", p: 5, m: 0}}>
        <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
          <TextField
            sx={{width: 400}}
            error={errors.title ? true : false}
            label="Название продукта"
            placeholder="Название продукта"
            type="text"
            helperText={errors.title ? errors.title.message : ''}
            {...register("title", {
              required: "Укажите название",
              minLength: { value: 3, message: "Слишком короткое название" },
              maxLength: { value: 25, message: "Слишком длинное название" },
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
              required: "Укажите описание продукта",
              minLength: { value: 3, message: "Слишком короткое описание" },
              maxLength: { value: 70, message: "Слишком длинное описание" },
            })}
          />
          <TextField
            sx={{width: 400}}
            error={errors.url ? true : false}
            label="Адрес картинки"
            placeholder="Адрес картинки"
            type="text"
            helperText={errors.url ? errors.url.message : ''}
            {...register("url", {
              required: "Вставте ссылку на изображение",
            })}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            size="large"
          >
            {isSubmitting ? "Создаем..." : "Создать"}
          </Button>
          {errors.root && (
            <span className="error-text">{errors.root.message}</span>
          )}
        </form>
      </Container>
    </main>
  );
};

export default CreatePage;