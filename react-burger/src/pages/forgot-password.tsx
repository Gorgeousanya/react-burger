import styles from './pages.module.css';
import { useHistory, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((store: RootStateOrAny) => store.auth.loggedIn);
  const [form, setForm] = React.useState({ email: "" });

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(forgotPassword(form.email));
    history.push({ pathname: '/reset-password', state: { prevPathname: history.location.pathname } });
  };

  if (loggedIn) {
    return (
      <Redirect to={"/"} />
    );
  }

  const onLogin = () => {
    history.replace({ pathname: '/login' });
  };

  return (
    <div className={styles.App}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <p className="text text_type_main-medium">
              Восстановление пароля
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
              errorText={'Ошибка'}
              size={'default'}
            />
          </div>
          <Button type="primary" size="medium" >
            Восстановить
          </Button>
          </form>
        </div>
        <div className={styles.save}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Button type="secondary" size="medium" onClick={onLogin}>
            Войти
          </Button>
        </div>
    </div>
  );
}