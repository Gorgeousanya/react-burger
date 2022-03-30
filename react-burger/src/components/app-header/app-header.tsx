import React from 'react';
import headerStyles from './app-header.module.css';
import { Tab, Button, Logo, BurgerIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
  return (
    
    <div className={headerStyles.burger_constructor}>
      
      <Button type="secondary" size="large" >
        <div className={headerStyles.burger_constructor}><BurgerIcon type="primary" />
        <p className={headerStyles.icon}>Конструктор</p>
        </div>
      </Button>
      <Button type="secondary" size="large" disabled={true}>
      <div className={headerStyles.burger_constructor}><ListIcon type="secondary" />
      <p className={headerStyles.icon}>Лента заказов</p>
      </div>
      </Button>
      <div className={headerStyles.logo}>
      <Logo />
      </div>
      <div className={headerStyles.profile}>
      <Button type="secondary" size="large" disabled={true}>
      <div className={headerStyles.burger_constructor}><ProfileIcon type="secondary" />
      <p className={headerStyles.icon}>Личный кабинет</p></div>
      </Button>
      </div>
      </div>
  )
}

export default AppHeader;