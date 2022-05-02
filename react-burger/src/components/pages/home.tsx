import React, { useEffect } from 'react';
import appStyles from './pages.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredient';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage() {
    return (
        <div className={appStyles.App}>
            <AppHeader />
            <main className={appStyles.page_content}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </div>
    )
}

export default HomePage;