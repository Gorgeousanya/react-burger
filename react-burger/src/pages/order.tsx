import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import styles from './pages.module.css';
import {
  wsConnectionClosedAction,
  wsConnectionStartAction,
} from '../services/actions/feed';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TIngredient } from '../utils/types';
import { useParams, useLocation } from 'react-router-dom';
import { formatStatus } from '../services/utils'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  console.log(location.pathname.split('/')[1])
  const orders = useSelector((state) => state.feed.orders);
  const order = orders?.orders?.find((item) => item._id === id);
  const ingredients = useSelector((store) => store.burger.ingredients);
  const orderIngredients = ingredients?.filter((ingredient: TIngredient) => order?.ingredients.includes(ingredient._id));

  const totalPrice = orderIngredients.reduce((total: number, cur: TIngredient) => {
    const sumIngredients = cur.type == 'bun' ? cur.price : cur.price * 2;
    total += sumIngredients;
    return total;
  }, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartAction(location.pathname.split('/')[1]=='feed'? false : true));

    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  if (!order)
  return (
    <main className={styles.modal} >
    <p className="text text_type_main-medium mt-30"> Подождите, идет загрузка...</p>
    </main>
  )

  return (
    <main className={styles.modal} >
      <p className="text text_type_digits-default ">#{order?.number}</p>
      <div className={styles.content}>
        <p className="text text_type_main-medium mt-10"> {order?.name}</p>
        <p className={styles.status}>{formatStatus(order?.status||'')}</p>
        <p className="text text_type_main-medium mt-6 mb-3">
          Состав:
        </p>
        {orderIngredients?.map((item: TIngredient, index: number) => (
          <div className={styles.ingredients} key={index}>
            <img className={styles.image} src={item?.image_mobile} />
            <p className="text text_type_main-default">{item?.name}</p>
            <div className={styles.total}>
              <p className="text text_type_digits-default mr-2">
                {item.type === 'bun' ? 2 : 1} x {item?.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
        <div className={styles.row}>
          <p className="text text_type_main-default text_color_inactive ">{order ? formatRelative(new Date(order.createdAt), new Date(), {
    locale: ru,
  }) : ''}</p>
          <div className={styles.total}>
            <p className="text text_type_digits-default mr-2 "> {totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrderPage;

