import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { getIngredientsData } from '../../services/actions/burger';
import { getUser } from '../../services/actions/auth'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientDetails, FeedPage, ProfileOrders, OrderPage } from '../../pages';
import ProtectedRoute from '../../components/protected-routes'
import AppHeader from '../app-header/app-header';
import { Modal } from '../modal/modal';
import { closeModal } from '../../services/actions/burger';
import { wsCloseModal } from '../../services/actions/feed';

type TLocation = {
  from: Location;
  background?: Location;
}

const App: FC = () => {
  const dispatch = useDispatch();
  let modalItem = useSelector((state) => state.burger.modal);
  let modalWs = useSelector((state)=> state.feed.wsModal)
  const loggedIn = useSelector((store) => store.auth?.loggedIn);
  const history = useHistory();
  const location = useLocation<TLocation>();
  let background = location.state && location.state.background;

  useEffect(
    () => {
      dispatch(getIngredientsData());
      if (localStorage.refreshToken){
        console.log(localStorage.refreshToken)
        dispatch(getUser());
      }
      // @ts-ignore
      history.replace()
      console.log(loggedIn)
    },
    [dispatch]
  );

  const onClose = () => {
    dispatch(closeModal)
    dispatch(wsCloseModal)
    history.goBack()
  }

  return (
    <div>
      <AppHeader />
      <Switch
        // @ts-ignore
        location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/react-burger" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders">
          <ProfileOrders />
        </ProtectedRoute>
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
        <Route path="/ingredients/:id" >
          <IngredientDetails />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
      </Switch>
      {modalItem && background &&
        <Route path="/ingredients/:id" exact={true}>
          <Modal isOpen={modalItem} onClose={onClose}
          > <IngredientDetails />
          </Modal>
        </Route>
      }
      { background &&
        <Route path="/feed/:id" exact={true}>
          <Modal isOpen={modalWs} onClose={onClose}>
            <OrderPage />
          </Modal>
        </Route>
      }
      {modalWs && background &&
        <Route path="/profile/orders/:id" exact={true}>
          <Modal isOpen={modalWs} onClose={onClose}>
            <OrderPage />
          </Modal>
        </Route>
      }
    </div>
  );
}

export default App;