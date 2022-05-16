import styles from './pages.module.css';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/auth';

export default function ResetPasswordPage() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const prevPathname = history.location.state;
  const [form, setForm] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLogin = () => {
    history.replace({ pathname: '/login' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form.password, form.token));
    if (!auth?.loggedIn.resetPasswordFailed) {
      history.push('/login');
    }
    else {
      alert("Не удалось восстановить пароль:(")
    }
  };

  if (!prevPathname) {
    return (
      <Redirect to={'/login'} />
    );
  }

  if (auth?.loggedIn) {
    return (
      <Redirect to={"/"} />
    );
  }

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
          <PasswordInput onChange={onChange} value={form.password} name={'password'} />
        </div>
        <div className={styles.input}>
          <Input
            type='text'
            placeholder='Введите код из письма'
            onChange={onChange}
            value={form.token}
            name='token'
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
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