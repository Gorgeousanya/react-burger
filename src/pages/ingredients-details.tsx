import styles from './pages.module.css';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const ingredients = useSelector((state) => state.burger.ingredients);
  const ingredient = ingredients?.find((ingredient) => ingredient._id === id);

  return (
    <div className={styles.component} >
      <p className="text text_type_main-large">
        Детали ингредиента
      </p>
      <img src={ingredient?.image_large} alt="image_large" />
      <p className="text text_type_main-medium">
        {ingredient?.name}
      </p>
      <div className={styles.ingredient}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
