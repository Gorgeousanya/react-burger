import React from 'react';
import data from '../utils/data'
import { Tab, Button, Logo, BurgerIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const bun = "Булки";
const sauce = "Соусы";
const main = "Начинки";

const Card = (props: any)=>{
    return(
      <React.Fragment>
        <div style={{width: "272px", margin: "16px", display: 'flex', flexDirection: 'column', alignItems: "center"}}>
          <img src={props.img} style={{width: "240px"}}/>
          <p className="text text_type_digits-default" style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>{props.price} <CurrencyIcon type="primary" /></p> 
          <p className="text text_type_main-default" style={{textAlign: "center"}}>{props.name}</p>
        </div>
        </React.Fragment>
    )
  }

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex', flexDirection: "column", flexWrap: "wrap", width: "50%" }}>
        <p className="text text_type_main-large" style={{margin: "40px 0 20px 0"}}>
          Соберите бургер
        </p>
        <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", marginBottom: "40px" }}>
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
        <div style={{ display: 'flex', flexDirection: "column", flexWrap: "wrap" }}>
        <p className="text text_type_main-medium">
         {bun}
        </p>
        <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item: any, i: number)=>
        item.type === "bun" &&
        <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
        }
        </div>
        <p className="text text_type_main-medium">
        {sauce}
        </p>
        <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item: any, i: number)=>
        item.type === "sauce" &&
        <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
        }
        </div>
        <p className="text text_type_main-medium">
        {main}
        </p>
        <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
        {data.map((item: any, i: number)=>
        item.type === "main" &&
        <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
        }
        </div>
        </div>
        </div>
    )
  }

  export default BurgerIngredients;