import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredient';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = React.useState([{}]);
  useEffect(()=>{
    const getData = async ()=>{fetch(url)
      .then((res)=> res.json())
      .then((data)=> setState([...state, data.data ]))
      .catch(err=> console.log("error"))
      
      console.log("state", state)
    }
    getData();
  }, [])
  
  
  return (
    <div className={appStyles.App}>
      
      <header className={appStyles.header}>
        <div className={appStyles.page_content}>
        <AppHeader />
        </div>
      </header >
      <main className={appStyles.page_content}>
        <BurgerIngredients data={state[1]}  />
        <BurgerConstructor data={state[1]} />
      </main>
    </div>
  )
}

export default App;
