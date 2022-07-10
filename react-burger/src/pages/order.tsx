import styles from './pages.module.css';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { RootStateOrAny, useSelector } from 'react-redux';
import { TIngredient, TOrder, TOrderInfo } from '../utils/types';
import { useParams } from 'react-router-dom';
import { formatStatus } from '../services/utils'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const orders = useSelector((state: RootStateOrAny) => state.feed.orders);
  const order = orders?.orders?.find((item: any) => item._id === id);
  const ingredients = useSelector((store: RootStateOrAny) => store.burger.ingredients);
  const orderIngredients = ingredients?.filter((ingredient: TIngredient) => order?.ingredients.includes(ingredient._id));

  const totalPrice = orderIngredients.reduce((total: number, cur: TIngredient) => {
    const sumIngredients = cur.type == 'bun' ? cur.price : cur.price * 2;
    total += sumIngredients;
    return total;
  }, 0);

  return (
    <main className={styles.modal} >
      <p className="text text_type_digits-default ">#{order?.number}</p>
      <div className={styles.content}>
        <p className="text text_type_main-medium mt-10"> {order?.name}</p>
        <p className={styles.status}>{formatStatus(order?.status)}</p>
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
        <div className={styles.ingredients}>
          <p className="text text_type_main-default text_color_inactive ">{formatRelative(new Date(order?.createdAt), new Date(), {
    locale: ru,
  })}</p>
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

