import { Route, Redirect, RouteProps, useLocation, useHistory } from "react-router-dom";
import {  useSelector, useDispatch } from '../services/hooks';
import { FC, useEffect } from 'react';
import { getUser } from '../services/actions/auth'

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const loggedIn = useSelector((store) => store.auth?.loggedIn);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

  useEffect(
    () => {
      if (loggedIn===undefined){
        dispatch(getUser());
      }
      // @ts-ignore
      history.replace()
    },
    [dispatch]
  );

    return (
        <Route
            {...rest}
            render={({  }) => (
                loggedIn ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />) 
            )}
        /> 
    );
}

export default ProtectedRoute;