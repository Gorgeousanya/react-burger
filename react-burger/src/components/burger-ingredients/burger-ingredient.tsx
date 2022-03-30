import React from 'react';
//import data from '../../utils/data';
import ingredientStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-detail/ingredients-details';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';

const bun = "Булки";
const sauce = "Соусы";
const main = "Начинки";

const Card = (props: any) => {
  return (
    <React.Fragment>
      <div className={ingredientStyles.card} onClick={() => { props.setOpen(true); props.setName(props.name); }}>
        <div className={ingredientStyles.counter}>
          <Counter count={1} size="default" />
        </div>
        <img src={props.img} className={ingredientStyles.img} />
        <p className="text text_type_digits-default" style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }} >{props.price} <CurrencyIcon type="primary" /></p>
        <p className="text text_type_main-default" style={{ textAlign: "center" }}>{props.name}</p>
      </div>
    </React.Fragment>
  )
}

const BurgerIngredients = (props: any) => {
  const [current, setCurrent] = React.useState('one');
  const [open, setOpen] = React.useState(false);
  const [ingredient, setIngredient] = React.useState('');
  return (
    <div className={ingredientStyles.ingredient}>

      <Modal
        message={'Детали заказа'}
        isOpen={open}
        onClose={() => setOpen(false)}
      > <IngredientDetails ingredient={props.data?.filter((item: any) => item.name == ingredient)[0]} />
      </Modal>
      <div className={ingredientStyles.burger}>
      <p className="text text_type_main-large">
        Соберите бургер
      </p>
      </div >
      <div className={ingredientStyles.tab}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          {bun}
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          {sauce}
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          {main}
        </Tab>
      </div>
      <div className={ingredientStyles.main}>
        <div >
          <p className="text text_type_main-medium">
            {bun}
          </p>
          <div className={ingredientStyles.map}>
            {props.data?.map((item: any) =>
              item.type === "bun" &&
              <Card key={item._id} img={item.image_large} price={item.price} name={item.name} setOpen={setOpen} setName={setIngredient} />)
            }
          </div>
          <p className="text text_type_main-medium">
            {sauce}
          </p>
          <div className={ingredientStyles.map}>
            {props.data?.map((item: any) =>
              item.type === "sauce" &&
              <Card key={item._id} img={item.image_large} price={item.price} name={item.name} setOpen={setOpen} setName={setIngredient} />)
            }
          </div>
          <p className="text text_type_main-medium">
            {main}
          </p>
          <div className={ingredientStyles.map}>
            {props.data?.map((item: any) =>
              item.type === "main" &&
              <Card key={item._id} img={item.image_large} price={item.price} name={item.name} setOpen={setOpen} setName={setIngredient} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired),
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
}

export default BurgerIngredients;