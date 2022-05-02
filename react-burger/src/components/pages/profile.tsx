import styles from './pages.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { updateUser, logout } from '../../services/actions';

export default function ProfilePage() {
  const inputRef = useRef(null)
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.user);
  console.log(user);
  const loggedIn = useSelector((state: RootStateOrAny) => state.loggedIn);
  const [form, setForm] = useState({ ...user, password: "" }); 

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(form.email, form.name));
  };

  const onReset = () => {
    setForm({ ...user });
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
      <AppHeader />
      <main className={styles.page_content}>
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
        <div className={styles.buttons}>
          <div className={styles.input}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.name}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={() => { }}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={'text'}
              placeholder={'Логин'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.email}
              name={'email'}
              error={false}
              ref={inputRef}
              onIconClick={() => { }}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.password}
              name={'password'}
              error={false}
              ref={inputRef}
              onIconClick={() => { }}
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <div className={styles.save}>
            <Button type='secondary' onClick={onReset}>
              Отмена
            </Button>
            <Button onClick={onSubmit}>
              Сохранить
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}