import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/hooks';
import { RootStateOrAny } from 'react-redux';
import { TIngredient, TOrderInfo } from '../../utils/types';
import { formatStatus } from '../../services/utils';
import { wsOpenModal } from '../../services/actions/feed';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

const OrderItem: FC<TOrderInfo> = ({ number, createdAt, name, ingredientsId, id, status }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredients = useSelector((store: RootStateOrAny) => store.burger.ingredients);
    const orderIngredients = ingredients.filter((ingredient: TIngredient) => ingredientsId.includes(ingredient._id)).reverse();
    const orderIngredientsShow = orderIngredients.length > 5 ? orderIngredients.slice(0, 5) : orderIngredients;
    const orderIngredientsHidden = orderIngredients.length > 5 ? orderIngredients.length - 5 : 0;

    const totalPrice = React.useMemo(
        () => orderIngredients ? orderIngredients.reduce((sum: number, current: TIngredient) => sum + current.price, 0) : 0,
        [orderIngredients]
    );

    const onClick = () => {
        dispatch(wsOpenModal)
    }

    return (
        <Link to={{ pathname: `${location.pathname}/${id}`, state: { background: location } }} className={styles.link} onClick={onClick}>
            <div className={styles.item}>
                <div className={styles.data}>
                    <p className="text text_type_digits-default">#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{formatRelative(new Date(createdAt), new Date(), {
    locale: ru,
  })}</p>
                </div>
                <p className="text text_type_main-medium pt-6 pb-4">{name}</p>
                <p className={styles.status}>{formatStatus(status)}</p>
                <div className={styles.data}>
                    <ul className={styles.list}>
                        {orderIngredientsShow.map((item: TIngredient, index: number) => (
                            <div key={index} className={styles.images}>
                                <img className={styles.image} src={item.image} alt={item.name} />
                                {index === 0 && orderIngredientsHidden > 0 && (
                                    <p className={styles.count}>+{orderIngredientsHidden}</p>
                                )}
                            </div>
                        ))}
                    </ul>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderItem;