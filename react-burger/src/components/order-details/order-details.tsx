import done from '../../images/done.svg';
import styles from './order.module.css';
import { useSelector } from '../../services/hooks';

export default function OrderDetails() {
  const order = useSelector((state) => state.burger.order.order);
  if (!order.success)
    return (
      <p className="text text_type_main-large mb-15"> Ваш заказ загружается...</p>
    )
  return (
    <div className={styles.component} >
      <p className="text text_type_main-large">{order?.name}</p>
      <p className="text text_type_digits-large">{order?.number}</p>
      <p className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <img src={done} alt="done" className={styles.img} />
      <p className="text text_type_main-default">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}



