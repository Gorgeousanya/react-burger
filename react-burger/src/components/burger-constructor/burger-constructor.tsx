import React from 'react';
import constructorStyles from './burger-constructor.module.css';
import { Tab, Button, Logo, DragIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

const Constructor = (props: any) => {
  return (
    <div className={constructorStyles.element}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
      />
    </div>
  )
}

const BurgerConstructor = (props: any) => {
  const [open, setOpen] = React.useState(false);
  let img = "https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    <React.Fragment>
      <Modal
        message={''}
        isOpen={open}
        onClose={() => setOpen(false)}
      > <OrderDetails order="034546" />
      </Modal>
      <div className={constructorStyles.content} >
        <div className={constructorStyles.locked}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail={img}
          />
        </div>
        <div className={constructorStyles.main}>
          {
            props.data?.map((item: any, i: number) =>
              item.type !== 'bun' && <Constructor key={item._id + i} item={item} />

              //     : <div style={{gap: "16px", width: "550px", paddingLeft: "28px"}}>
              //       {i == 0 &&
              //   <ConstructorElement
              //     type="top"
              //     isLocked={true}
              //     text={item.name+' (верх)'}
              //     price={item.price}
              //     thumbnail={item.image}
              //   /> 
              //   : <ConstructorElement
              //   type="bottom"
              //   isLocked={true}
              //   text={item.name+' (верх)'}
              //   price={item.price}
              //   thumbnail={item.image}
              // />
              //       }
              //   </div> 
            )}
        </div>
        <div className={constructorStyles.locked}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={1255}
            thumbnail={img}
          />
        </div>
        <div className={constructorStyles.cost}>
          <div className={constructorStyles.price}>
            <p className="text text_type_digits-medium" >
              1510
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <Button type="primary" size="large" onClick={() => setOpen(true)}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
}

Constructor.propTypes = {
  item: ingredientPropTypes.isRequired,
}

export default BurgerConstructor;