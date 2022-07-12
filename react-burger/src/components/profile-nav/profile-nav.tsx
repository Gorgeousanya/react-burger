import React from 'react';
import styles from './profile-nav.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../services/actions/auth';

export const ProfileNav: React.FC = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout());
    if (!loggedIn) {
      return (
        <Redirect to={"/login"} />
      );
    }
  };

  const onProfile = () => {
    history.replace({ pathname: '/profile' });
  };

  const onProfileOrder = () => {
    history.replace({ pathname: '/profile/orders' });
  };

  return (
    <React.Fragment>
      <div className={styles.buttons}>
        <Button type="secondary" size="large" onClick={onProfile}>
          <p className="text text_type_main-medium">
            Профиль
          </p>
        </Button>
        <Button type="secondary" size="large" onClick={onProfileOrder}>
          <p className="text text_type_main-medium">
            История заказов
          </p>
        </Button>
        <Button type="secondary" size="large" onClick={onLogout}>
          <p className="text text_type_main-medium">
            Выход
          </p>
        </Button>
        <p className="text text_type_main-default text_color_inactive mt-20 ml-10">
          В этом разделе Вы можете изменить свои персональные данные
        </p>
      </div>
    </React.Fragment>
  )
}