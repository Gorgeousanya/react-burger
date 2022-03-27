import React from 'react';
import './App.css';
import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredient';
import BurgerConstructor from './components/burger-constructor';

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: "wrap",  flexDirection: "column",}}>
      <header style={{backgroundColor:"#1C1C21"}}>
        <AppHeader/>
      </header >
      <main style={{ display: 'flex', flexDirection: "row", alignItems: "flex-start", flexWrap: "wrap" }}>
      < BurgerIngredients />
      <BurgerConstructor />
      </main>
      
    </div>
  )
}

export default App;
