import React, { useRef } from 'react';
import { v4 as uuidv4 } from "uuid"
import constructorStyles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { ADD_INGREDIENT, CHANGE_SORT, DELETE_INGREDIENT, OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER, CLEAR_ORDER } from '../../services/actions';
import { getOrderID } from '../../services/actions';


const Constructor = ({ item, index }: any) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { index }
  });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    hover: (item: any) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      dispatch({ type: CHANGE_SORT, drag: dragIndex, hover: hoverIndex })
      item.index = hoverIndex;
    }
  });

  dragRef(dropTarget(ref));

  return (
    <div className={constructorStyles.element} ref={ref} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item?.name}
        price={item?.price}
        thumbnail={item?.image}
        handleClose={() => { dispatch({ type: DELETE_INGREDIENT, id: item?.uuid }); }}
      />
    </div>
  )
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const constructor = useSelector((state: RootStateOrAny) => state.constructor);
  const bun = constructor?.find((ingredient: any) => ingredient?.type === 'bun');
  const other = constructor?.filter((ingredient: any) => ingredient?.type && ingredient?.type !== 'bun');
  const order = useSelector((state: RootStateOrAny) => state.order);
  const open = useSelector((state: RootStateOrAny) => state.modalOrder);

  const total = React.useMemo(
    () =>
      constructor
        ? constructor.filter((ingredient: any) => ingredient?.price).reduce((sum: any, current: any) => sum + current.price, 0)
        : 0,
    [constructor]
  );

  const [{ isDrop }, dropTarget] = useDrop({
    accept: "ingredients",
    drop: (ingredient: any) => {
      if (bun && ingredient.type === "bun") {
        console.log("bun")
        dispatch({
          type: DELETE_INGREDIENT,
          id: bun.uuid
        });
      }
      dispatch({
        type: ADD_INGREDIENT,
        item: { ...ingredient, uuid: uuidv4() }
      });
    },
    collect: (monitor) => ({
      isDrop: monitor.isOver(),
    }),
  });

  const clickOrder = () => {
    const data = constructor.map(((item: any) => item._id));
    dispatch(getOrderID(data));
    setTimeout(() => {
      dispatch({
        type: OPEN_MODAL_ORDER
      })
    }, 1000)
  }

  const classNameContainer = `${constructorStyles.container} ${isDrop && constructorStyles.drop}`

  return (
    <React.Fragment>
      <Modal
        message={order?.name || ''}
        isOpen={open}
        onClose={() => { dispatch({ type: CLOSE_MODAL_ORDER }); dispatch({ type: CLEAR_ORDER }); }}
      > <OrderDetails order={order} />
      </Modal>
      <div className={classNameContainer} ref={dropTarget}>

        {
          bun
          && <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        }

        <div className={constructorStyles.main}>
          {other &&
            other?.map((item: any, i: any) =>
              (<Constructor key={item?.uuid} item={item} index={i} />))
          }
        </div>
        {
          bun
          && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        }
        <div className={constructorStyles.cost}>
          <div className={constructorStyles.price}>
            <p className="text text_type_digits-medium" >
              {total}
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <Button type="primary" size="large" onClick={() => { clickOrder() }} disabled={total == 0}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}


Constructor.propTypes = {
  item: ingredientPropTypes.isRequired,
  index: PropTypes.number,
}

export default BurgerConstructor;