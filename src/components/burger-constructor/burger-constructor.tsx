import React from 'react';
import { v4 as uuidv4 } from "uuid"
import constructorStyles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { TIngredient } from '../../utils/types';
import { useDrag, useDrop } from "react-dnd";
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { getOrderID, deleteIngredient, addIngredient, changeSortIngredient, resetOrder, closeModalOrder, openModalOrder } from '../../services/actions/burger';
import { useHistory } from 'react-router-dom';


const Constructor: React.FC<TConstructor> = ({ item, index }) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
      dispatch(changeSortIngredient(dragIndex, hoverIndex))
      item.index = hoverIndex;
    }
  });

  const onClose = () => {
    dispatch(deleteIngredient(item?.uuid));
  }

  dragRef(dropTarget(ref));

  return (
    <div className={constructorStyles.element} ref={ref} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item?.name}
        price={item?.price}
        thumbnail={item?.image}
        handleClose={onClose}
      />
    </div>
  )
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const constructor = useSelector((state: RootStateOrAny) => state.burger.constructor ?? []);
  const bun = constructor.find((ingredient: any) => ingredient?.type === 'bun');
  const other = constructor.filter((ingredient: any) => ingredient?.type && ingredient?.type !== 'bun');
  const open = useSelector((state: RootStateOrAny) => state.burger.modalOrder);
  const history = useHistory();
  const loggedIn = useSelector((store: RootStateOrAny) => store.auth.loggedIn);
  
  const total: number = React.useMemo(
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
        dispatch(deleteIngredient(bun?.uuid));
      }
      dispatch(addIngredient({ ...ingredient, uuid: uuidv4() }))
    },
    collect: (monitor) => ({
      isDrop: monitor.isOver(),
    }),
  });

  const clickOrder = () => {
    if (loggedIn) {
      const data = constructor.map(((item: any) => item._id));
      dispatch(getOrderID(data));
      setTimeout(() => {
        dispatch(openModalOrder())
      }, 1000)
    } else {
      history.push("/login");
    }
  }

  const onClose = () => {
    dispatch(closeModalOrder()); 
    dispatch(resetOrder());
  }

  const classNameContainer = `${constructorStyles.container} ${isDrop && constructorStyles.drop}`

  return (
    <React.Fragment>
      <Modal
        isOpen={open}
        onClose={onClose}
      > <OrderDetails />
      </Modal>
      <div className={classNameContainer} ref={dropTarget}>
        {
          bun
            ? <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
            : <p className="text text_type_main-medium" >
              Перенесите сюда ингредиенты для бургера
            </p>
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
          <Button type="primary" size="large" onClick={clickOrder} disabled={total === 0}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}


type TConstructor = {
  item: TIngredient,
  index: number,
}

export default BurgerConstructor;