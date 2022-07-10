import styles from './pages.module.css';
import React, { useState, useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { updateUser} from '../services/actions/auth';
import { ProfileNav } from '../components/profile-nav/profile-nav';

export default function ProfilePage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const [form, setForm] = useState({ ...user, password: "" });
  const [isSame, setSame] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSame(false);
  }

  const onSubmit = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    dispatch(updateUser(form.email, form.name));
  };

  const onReset = () => {
    setForm({ ...user });
    setSame(true);
  };

  return (
    <div className={styles.App}>
      <main className={styles.page_content}>
        <ProfileNav /> 
        <form className={styles.buttons} onSubmit={onSubmit}>
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