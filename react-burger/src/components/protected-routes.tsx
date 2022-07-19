import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import {  useSelector } from '../services/hooks';
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const loggedIn = useSelector((store) => store.auth?.loggedIn);
    const location = useLocation();

    return (
        loggedIn!=undefined ?
        <Route
            {...rest}
            render={({  }) => (
                loggedIn ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location } }} />) 
            )}
        /> : null
    );
}

export default ProtectedRoute;