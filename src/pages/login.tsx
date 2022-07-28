import styles from './pages.module.css';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import React, { useState, useRef, SyntheticEvent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../services/actions/auth';
import { useDispatch, useSelector } from '../services/hooks';

interface LocationState {
  from: {
    pathname: string;
  };
}

export default function LoginPage() {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const inputRef = useRef(null)
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onRegister = () => {
    history.replace({ pathname: '/register' });
  };

  const onForgotPassword = () => {
    history.replace({ pathname: '/forgot-password' });
  };

  const onSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
};

if (loggedIn) {
  return (
      <Redirect to={location.state?.from || '/'} />
  );
}

  return (
    <div className={styles.App}>
      <div className={styles.inputs}>
        <div className={styles.input}>
          <p className="text text_type_main-medium">
            Вход
          </p>
        </div>
        <form onSubmit={onSubmit}>
        <div className={styles.input}>
          <Input
            type='text'
            placeholder='E-mail'
            onChange={onChange}
            value={form.email}
            name='email'
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
        <Input
            type='text'
            placeholder='Пароль'
            onChange={onChange}
            value={form.password} 
            name='password'
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="medium" >
          Войти
        </Button>
        </form>
      </div>
      <div className={styles.save}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </p>
        <Button type="secondary" size="medium" onClick={onRegister}>
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.save}>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </p>
        <Button type="secondary" size="medium" onClick={onForgotPassword}>
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}