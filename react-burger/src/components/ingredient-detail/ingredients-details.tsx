import React from 'react';
import styles from './ingredient.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

export default function IngredientDetails(props: any) {
  return (
    <div className={styles.component} >
      <img src={props.ingredient[0].image_large} alt="image_large" />
      <p className="text text_type_main-medium">
        {props.ingredient[0].name}
      </p>
      <div className={styles.ingredient}>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient[0].calories}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient[0].proteins}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient[0].fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {props.ingredient[0].carbohydrates}
          </p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.arrayOf(ingredientPropTypes.isRequired),
}
