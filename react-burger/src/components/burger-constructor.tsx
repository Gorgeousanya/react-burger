import React from 'react';
import { Tab, Button, Logo, BurgerIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = (props: any) => {
  const [count, setCount] = React.useState(0);
  let img="https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    <React.Fragment>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: "100px" }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={1255}
        thumbnail={img}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={1255}
        thumbnail={img}
      />
      <div style={{margin: "40px 0 auto auto", display: "inline-flex"}}>
      <p className="text text_type_digits-medium" style={{display: 'flex', flexDirection: 'row', alignItems: "center", marginRight: "40px"}}>1510 <CurrencyIcon type="primary" /></p> 
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </div>
    </div>
    
      </React.Fragment>
  )
}

export default BurgerConstructor;