import React from 'react';
import ingredientStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { openModal, setTab } from '../../services/actions/burger';
import { useDrag } from "react-dnd";
import { useHistory, useLocation, Link } from 'react-router-dom';

const bun = "Булки";
const sauce = "Соусы";
const main = "Начинки";

const Card = (props: any) => {
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: props.item
  });
  const location = useLocation();
  const ingredientId = props.item['_id'];
  const constructor = useSelector((state: RootStateOrAny) => state.burger.constructor);
  const count = constructor?.filter((item: any) => item._id === props.item._id).length;
  return (
    <React.Fragment>
      <Link
        key={ingredientId}
        to={{
          pathname: `/ingredients/${ingredientId}`,
          state: { background: location },
        }}>
        <div className={ingredientStyles.card} onClick={props.onClick} ref={dragRef}>
          {
            count !== 0 && count &&
            <div className={ingredientStyles.counter}>
              <Counter count={count} size="default" />
            </div>
          }
          <img src={props.item.image_large} className={ingredientStyles.img} alt={props.item.name} />
          <div className={ingredientStyles.map}>
            <p className="text text_type_digits-default"  >
              {props.item.price}
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <p className="text text_type_main-default" >{props.item.name}</p>
        </div>
      </Link>
    </React.Fragment>
  )
}

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const current = useSelector((state: RootStateOrAny) => state.burger.tab);
  const items = useSelector((state: RootStateOrAny) => state.burger.ingredients);

  function clickTab(e: any) {
    dispatch(setTab(e));
    document.getElementById(e + "-list")?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function scrollIngredientsList() {
    const arr = ["one", "two", "three"];
    let pos = document.getElementById("ingredients-list")?.scrollTop || 0;
    let res = "";
    let resdy = 1000000;
    let dy = 0;
    arr.forEach(item => {
      let offsetTopItem = document.getElementById(item + "-list")?.offsetTop || 0;
      let offsetTop = document.getElementById("ingredients-list")?.offsetTop || 0;
      dy = Math.abs(offsetTopItem - offsetTop - pos);
      if (dy < resdy) { res = item; resdy = dy }
    });
    if (res !== current)
      dispatch(setTab(res));
  }

  const clickItem = (el: any) => {
    dispatch(openModal(el));
    console.log('click')
  }

  return (
    <div className={ingredientStyles.ingredient}>
      <div className={ingredientStyles.burger}>
        <p className="text text_type_main-large">
          Соберите бургер
        </p>
      </div >
      <div className={ingredientStyles.tab}>
        <Tab value="one" active={current === 'one'} onClick={clickTab}>
          {bun}
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={clickTab}>
          {sauce}
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={clickTab}>
          {main}
        </Tab>
      </div>
      <div className={ingredientStyles.main} id="ingredients-list" onScroll={scrollIngredientsList}>
        <div >
          <p className="text text_type_main-medium" id="one-list">
            {bun}
          </p>
          <div className={ingredientStyles.map} >
            {items?.map((item: any) =>
              item.type === "bun" &&
              <Card key={item._id} item={item} onClick={() => { clickItem(item) }} />)
            }
          </div>
          <p className="text text_type_main-medium" id="two-list">
            {sauce}
          </p>
          <div className={ingredientStyles.map}>
            {items?.map((item: any) =>
              item.type === "sauce" &&
              <Card key={item._id} item={item} onClick={() => { clickItem(item) }} />)
            }
          </div>
          <p className="text text_type_main-medium" id="three-list">
            {main}
          </p>
          <div className={ingredientStyles.map}>
            {items?.map((item: any) =>
              item.type === "main" &&
              <Card key={item._id} item={item} onClick={() => { clickItem(item) }} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  item: ingredientPropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default BurgerIngredients;