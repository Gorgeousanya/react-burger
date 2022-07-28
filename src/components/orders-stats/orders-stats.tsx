import { FC } from 'react';
import { TOrder } from '../../utils/types';
import styles from './orders-stats.module.css';
import {  useSelector } from '../../services/hooks';

export const OrdersStats: FC = () => {
  const order = useSelector((store) => store.feed.orders);

  if (!order) {
    return null;
  }

  const done = order?.orders?.filter((item) => item.status === 'done').slice(0, 5);
  const pending = order?.orders?.filter((item) => item.status === 'pending').slice(0, 5);

  return (
    <main className={styles.main}>
      <div className={styles.orders}>
        <div className={styles.column}>
          <p className="text text_type_main-medium mt-10">
            Готовы:
          </p>
          {done?.map((order) => (
            <p className={`text text_type_digits-default mt-2 ${styles.doneNumber}`} key={order._id}>{order.number}</p>
          ))}
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium mt-10 ml-30">
            В работе:
          </p>
          {pending?.map((order: TOrder) => (
            <p className={`text text_type_digits-default mt-2 ${styles.doneNumber}`} key={order._id}>{order.number}</p>
          ))}
        </div>
      </div>
      <p className="text text_type_main-medium mt-10">
        Выполнено за все время:
      </p>
      <p className={`text text_type_digits-large ${styles.count}`}>
        {order.total}
      </p>
      <p className="text text_type_main-medium mt-10">
        Выполнено за сегодня:
      </p>
      <p className={`text text_type_digits-large ${styles.count}`}>
        {order.totalToday}
      </p>
    </main>
  );
};
