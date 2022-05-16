import { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { getIngredientsData } from '../../services/actions/burger';
 import { getUser } from '../../services/actions/auth'
 import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
 import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientDetails } from '../../pages';
 import ProtectedRoute from '../protected-routes';
 import AppHeader from '../app-header/app-header';
 import Modal from '../modal/modal';
 import { closeModal } from '../../services/actions/burger';

 function App() {
   const dispatch = useDispatch();
   let modalItem = useSelector(state => state.burger.modal);
   const history = useHistory();
   const location = useLocation();
   let background = location.state && location.state.background;

   useEffect(
     () => {
       dispatch(getIngredientsData());
       if (localStorage.refreshToken)
       dispatch(getUser());
       history.replace()
     },
     [dispatch]
   );

   const onClose = () => {
     dispatch(closeModal)
     history.goBack()
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
         <Route path="/ingredients/:id" >
           <IngredientDetails />
         </Route>
       </Switch>
       {modalItem && background &&
         <Route path="/ingredients/:id" exact={true}>
           <Modal
             isOpen={modalItem}
             onClose={onClose}
           > <IngredientDetails />
           </Modal>
         </Route>
       }
     </div>
   );
 }

 export default App;