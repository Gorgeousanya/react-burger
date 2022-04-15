import done from '../../images/done.svg';
import styles from './order.module.css';
import PropTypes from 'prop-types';

export default function OrderDetails(props: any) {
  console.log(props.order)
  return (
    <div className={styles.component} >
      <p className="text text_type_digits-large">{props.order.order.number}</p>
      <p className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <img src={done} alt="done" className={styles.img} />
      <p className="text text_type_main-default">
        Ваш заказ начали готовить </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.object,
}


