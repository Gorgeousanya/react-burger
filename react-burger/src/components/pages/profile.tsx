import styles from './pages.module.css';
import { Redirect } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { updateUser, logout } from '../../services/actions/auth';

export default function ProfilePage() {
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const loggedIn = useSelector((state: RootStateOrAny) => state.auth.loggedIn);
  const [form, setForm] = useState({ ...user, password: "" }); 
  const [isSame, setSame] = useState(true);

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSame(false);
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(form.email, form.name));
  };

  const onReset = () => {
    setForm({ ...user });
    setSame(true);
  };

  const onLogout = () => {
    dispatch(logout());
    if (!loggedIn) {
      return (
        <Redirect to={"/login"} />
      );
    }
  };

  return (
    <div className={styles.App}>
      <main className={styles.page_content} onSubmit={onSubmit}>
        <div className={styles.buttons}>
          <Button type="secondary" size="large" >
            <p className="text text_type_main-medium">
              Профиль
            </p>
          </Button>
          <Button type="secondary" size="large" disabled={true}>
            <p className="text text_type_main-medium">
              История заказов
            </p>
          </Button>
          <Button type="secondary" size="large" onClick={onLogout}>
            <p className="text text_type_main-medium">
              Выход
            </p>
          </Button>
          <div className={styles.text}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе Вы можете изменить свои персональные данные
            </p>
          </div>
        </div>
        <form className={styles.buttons} noValidate>
          <div className={styles.input}>
            <Input
              type='text'
              placeholder='Имя'
              icon='EditIcon'
              onChange={onChange}
              value={form.name}
              name='name'
              error={false}
              ref={inputRef}
            />
          </div>
          <div className={styles.input}>
            <Input
              type='text'
              placeholder='Логин'
              onChange={onChange}
              icon='EditIcon'
              value={form.email}
              name='email'
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
            />
          </div>
          <div className={styles.input}>
            <Input
              type='text'
              placeholder='Пароль'
              onChange={onChange}
              icon='EditIcon'
              value={form.password}
              name='password'
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
            />
          </div>
          <div className={styles.save}>
            <Button type='secondary' onClick={onReset} disabled={isSame} >
              Отмена
            </Button>
            <Button disabled={isSame}>
              Сохранить
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}