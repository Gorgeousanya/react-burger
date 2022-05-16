import appStyles from './pages.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredient'
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function HomePage() {
    return (
        <div className={appStyles.App}>
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