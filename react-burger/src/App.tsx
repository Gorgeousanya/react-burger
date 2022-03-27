import React from 'react';
import logo from './logo.svg';
import { Tab, Button, Logo, BurgerIcon, ListIcon, ProfileIcon, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import './App.css';
import data from './utils/data.js'

const bun = "Булки";
const sauce = "Соусы";
const main = "Начинки";
//const [burger, setBurger] = React.useState([{}]);


const AppHeader = () => {
  return (
    
    <div style={{ display: 'flex', flexDirection: "row", alignItems: "center"}}>
      
      <Button type="secondary" size="large" >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><BurgerIcon type="primary" />
        <p style={{paddingLeft:"8px"}}>Конструктор</p>
        </div>
      </Button>
      <Button type="secondary" size="large" disabled={true}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><ListIcon type="secondary" />
      <p style={{paddingLeft:"8px"}}>Лента заказов</p>
      </div>
      </Button>
      <div style={{ position: "absolute",
        top: "50px",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"}}>
      <Logo />
      </div>
      <div style={{margin: "auto 0 auto auto"}}>
      <Button type="secondary" size="large" disabled={true}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}><ProfileIcon type="secondary" />
      <p style={{paddingLeft:"8px"}}>Личный кабинет</p></div>
      </Button>
      </div>
      </div>
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
      {data.map((item, i)=>
      item.type === "bun" &&
      <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
      }
      </div>
      <p className="text text_type_main-medium">
      {sauce}
      </p>
      <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
      {data.map((item, i)=>
      item.type === "sauce" &&
      <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
      }
      </div>
      <p className="text text_type_main-medium">
      {main}
      </p>
      <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap" }}>
      {data.map((item, i)=>
      item.type === "main" &&
      <Card key={i} img={item.image_large} price={item.price} name={item.name}/>)
      }
      </div>
      </div>
      </div>
  )
}

const BurgerConstructor = (props: any) => {
  const [count, setCount] = React.useState(0);
  let img="https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    <React.Fragment>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: "100px" }}>

      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={img}
      />
      <div style={{margin: "40px 0 auto auto", display: "inline-flex"}}>
      <p className="text text_type_digits-medium" style={{display: 'flex', flexDirection: 'row', alignItems: "center", marginRight: "40px"}}>{count} <CurrencyIcon type="primary" /></p> 
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </div>
    </div>
    
      </React.Fragment>
  )
}

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
// async function data () {
//   const response = await fetch('/Users/annaplokhotnyuk/Documents/practicum/react-burger/src/utils/data.js');
//   const names = await response.json();
//   console.log(names); 
// }

function App() {
  //setBurger([...burger, data[0]]);
  let img="https://code.s3.yandex.net/react/code/bun-02.png";
  return (
    
    <div style={{ display: 'flex', flexWrap: "wrap",  flexDirection: "column",}}>
      <header style={{backgroundColor:"#1C1C21"}}>
        <AppHeader/>
      </header >
      <div style={{ display: 'flex', flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}>
      
      < BurgerIngredients />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: "100px" }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={1255}
        thumbnail={img}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={1255}
        thumbnail={img}
      />
      <div style={{margin: "40px 0 auto auto", display: "inline-flex"}}>
      <p className="text text_type_digits-medium" style={{display: 'flex', flexDirection: 'row', alignItems: "center", marginRight: "40px"}}>1510 <CurrencyIcon type="primary" /></p> 
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </div>
    </div>
    
      </div>
      
    </div>
  )
}

export default App;
