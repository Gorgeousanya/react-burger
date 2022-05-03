import styles from './pages.module.css';
import AppHeader from '../app-header/app-header';
import { Redirect, useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/auth';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

export default function LoginPage() {
  const history = useHistory();
  const inputRef = useRef(null)
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootStateOrAny) => state.auth.loggedIn);

  const onChange = (e:any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onRegister = () => {
    history.replace({ pathname: '/register' });
  };

  const onForgotPassword = () => {
    history.replace({ pathname: '/forgot-password' });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
    console.log(form.email, form.password);
};

if (loggedIn) {
  return (
      <Redirect to={"/"} />
  );
}

  return (
    <div className={styles.App}>
      <AppHeader />
      <div className={styles.inputs}>
        <div className={styles.input}>
          <p className="text text_type_main-medium">
            Вход
          </p>
        </div>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={onChange}
            value={form.email}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>
        <Button type="primary" size="medium" onClick={onSubmit}>
          Войти
        </Button>
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