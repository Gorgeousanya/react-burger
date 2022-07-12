import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import styles from './pages.module.css';
import {
  wsConnectionClosedAction,
  wsConnectionStartAction,
} from '../services/actions/feed';
import OrderItem from '../components/order-item/order-item';
import { TOrder } from '../utils/types';
import { ProfileNav } from '../components/profile-nav/profile-nav';

export default function ProfileOrders() {
  const order = useSelector((store) => store.feed.orders);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartAction(true));

    return () => {
      dispatch(wsConnectionClosedAction());
    };
  }, [dispatch]);


  useEffect(() => {
    if (order) {
      setOrders(order!.orders);
    }
  }, [order]);

  if (!order) {
    return null;
  }
  return (
    <div className={styles.page_content}>
      <ProfileNav />
      <div className={styles.main}>
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
    </div>
  );
}
