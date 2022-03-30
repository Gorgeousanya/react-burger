import React, { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredient';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [state, setState] = React.useState([]);
  useEffect(() => {
    const getData = async () => {
      fetch(url)
      .then((res) => {return res.ok ? res.json() : res.json().then((err)=>Promise.reject(err))})
      .then((data) => {return data.data})
      .then(setState)
      .catch(() => alert("Во время загрузки данных произошла ошибка:("))
    }
    getData();
  }, [])


  return (
    <div className={appStyles.App}>
      <AppHeader />
      <main className={appStyles.page_content}>
        <BurgerIngredients data={state} />
        <BurgerConstructor data={state} />
      </main>
    </div>
  )
}

export default App;
