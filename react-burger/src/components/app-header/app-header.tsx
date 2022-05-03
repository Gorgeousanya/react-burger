import headerStyles from './app-header.module.css';
import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

const AppHeader = () => {
  const history = useHistory();

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <Button type="secondary" size="large" onClick={() => {
          history.replace({ pathname: '/' });
        }}>
          <div className={headerStyles.content}><BurgerIcon type="primary" />
            <p className={headerStyles.icon}>Конструктор</p>
          </div>
        </Button>
        <Button type="secondary" size="large" disabled={true}>
          <div className={headerStyles.content}><ListIcon type="secondary" />
            <p className={headerStyles.icon}>Лента заказов</p>
          </div>
        </Button>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <div className={headerStyles.profile}>
          <Button type="secondary" size="large" onClick={() => {
            history.replace({ pathname: '/profile' });
          }}>
            <div className={headerStyles.content}><ProfileIcon type="primary" />
              <p className={headerStyles.icon}>Личный кабинет</p></div>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;