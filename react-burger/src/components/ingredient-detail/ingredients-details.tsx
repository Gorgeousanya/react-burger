import React from 'react';
import styles from './ingredient.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

export default function IngredientDetails(props: any) {
  return (
    <div className={styles.component} >
      <img src={props.ingredient.image_large} alt="image_large" />
      <p className="text text_type_main-medium">
        {props.ingredient.name}
      </p>
      <div className={styles.ingredient}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient.calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient.proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient.fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.objectOf(ingredientPropTypes.isRequired),
}
