import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from 'react-router-dom';

const AppHeader = () => {
  const home = useRouteMatch("/");
  const list = useRouteMatch("/list");
  const profile = useRouteMatch("/profile");
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.content}>
        <NavLink exact to="/" className={headerStyles.button} activeClassName={headerStyles.button_active}>
          <div className={headerStyles.content}><BurgerIcon type={home?.isExact ? "primary" : "secondary"} />
            <p className={headerStyles.button_text} >Конструктор</p>
          </div>
        </NavLink>
        <NavLink exact to="/list" className={headerStyles.button} activeClassName={headerStyles.button_active}>
          <div className={headerStyles.content}><ListIcon type={list ? "primary" : "secondary"} />
            <p className={headerStyles.button_text}>Лента заказов</p>
          </div>
        </NavLink>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
        <NavLink exact to="/profile" className={headerStyles.button} activeClassName={headerStyles.button_active}>
          <div className={headerStyles.content}><ProfileIcon type={profile ? "primary" : "secondary"} />
            <p className={headerStyles.button_text}>Личный кабинет</p></div>
        </NavLink>
      </div>
    </header>
  )
}

export default AppHeader;