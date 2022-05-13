import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsData } from '../../services/actions/burger';
import { getUser } from '../../services/actions/auth'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientDetails } from '../pages';
import ProtectedRoute from '../protected-routes';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import { closeModal, resetOrder, closeModalOrder, } from '../../services/actions/burger';
import OrderDetails from '../order-details/order-details';

function App() {
  const dispatch = useDispatch();
  let modalItem = useSelector(state => state.burger.modal);
  let open = useSelector(state => state.burger.modalOrder);
  const order = useSelector(state => state.burger.order);
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(
    () => {
      dispatch(getIngredientsData());
      dispatch(getUser());
    },
    [dispatch]
  );

  const onClose = () => {
    dispatch(closeModal)
    history.push('/');
  }

  const onCloseOrder = () => {
    dispatch(closeModalOrder()); 
    dispatch(resetOrder());
  }

  return (
    <div>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/profile" >
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path="/ingredient/:id" exact={true}>
          <IngredientDetails />
        </Route>
      </Switch>
      {background && (
          <Route
            path='/ingredients/:id'
            children={
            <Modal
              isOpen={modalItem}
              onClose={onClose}
            > <IngredientDetails />
            </Modal>
            }
          />
        )}
      { order?.order?.number &&
      <Modal
      isOpen={open}
      onClose={onCloseOrder}
    > <OrderDetails />
    </Modal>
            }
    </div>
  );
}

export default App;
