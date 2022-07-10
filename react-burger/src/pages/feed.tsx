import { FC, useEffect } from 'react';
import { TOrder, TOrders } from '../utils/types';
import { OrdersStats } from '../components/orders-stats/orders-stats';
import OrderItem from '../components/order-item/order-item';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
  wsConnectionClosedAction,
  wsConnectionStartAction,
} from '../services/actions/feed';
import styles from '../pages/pages.module.css';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartAction(false));

    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);

  const orders = useSelector((store: RootStateOrAny) => store.feed.orders.orders);
  
  return (
    <main className={styles.page_content}>
      <div className={styles.main}>
            <h2 className="text text_type_main-large mt-10 ml-5">Лента заказов</h2>
            {orders?.map((item: TOrder) => (
                    <OrderItem
                        key={item._id}
                        id={item._id}
                        number={item.number}
                        createdAt={item.createdAt}
                        name={item.name}
                        ingredientsId={item.ingredients}
                        status={item.status}
                    />
                ))}
        </div>
      <OrdersStats />
    </main>
  )
}