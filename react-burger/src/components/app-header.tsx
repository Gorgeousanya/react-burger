import React from 'react';
import { Tab, Button, Logo, BurgerIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = () => {
  return (
    
    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center"}}>
      
      <Button type="secondary" size="large" >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><BurgerIcon type="primary" />
        <p style={{paddingLeft:"8px"}}>Конструктор</p>
        </div>
      </Button>
      <Button type="secondary" size="large" disabled={true}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><ListIcon type="secondary" />
      <p style={{paddingLeft:"8px"}}>Лента заказов</p>
      </div>
      </Button>
      <div style={{ position: "absolute",
        top: "50px",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"}}>
      <Logo />
      </div>
      <div style={{margin: "auto 0 auto auto"}}>
      <Button type="secondary" size="large" disabled={true}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><ProfileIcon type="secondary" />
      <p style={{paddingLeft:"8px"}}>Личный кабинет</p></div>
      </Button>
      </div>
      </div>
  )
}

export default AppHeader;