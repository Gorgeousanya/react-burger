import { useEffect, FC } from 'react';
 import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
 import { getIngredientsData } from '../../services/actions/burger';
 import { getUser } from '../../services/actions/auth'
 import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
 import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientDetails } from '../../pages';
 import ProtectedRoute from '../../components/protected-routes'
 import AppHeader from '../app-header/app-header';
 import {Modal} from '../modal/modal';
 import { closeModal } from '../../services/actions/burger';

 type TLocation = {
  from: Location;
  background?: Location;
}

 const App:FC = () => {
   const dispatch = useDispatch();
   let modalItem = useSelector((state: RootStateOrAny )=> state.burger.modal);
   const history = useHistory();
   const location = useLocation<TLocation>();
   let background = location.state && location.state.background;

   useEffect(
     () => {
       dispatch(getIngredientsData());
       if (localStorage.refreshToken)
       dispatch(getUser());
       // @ts-ignore
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
       <Switch 
       // @ts-ignore
       location={background || location}>
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