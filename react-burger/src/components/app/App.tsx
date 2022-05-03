import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredientsData } from '../../services/actions/burger';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from '../pages';
import  ProtectedRoute from '../protected-routes'

function App() {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getIngredientsData());
    },
    [dispatch]
  );


  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
