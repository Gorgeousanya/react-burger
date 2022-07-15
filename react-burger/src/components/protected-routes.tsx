import { Route, Redirect, RouteProps } from "react-router-dom";
import {  useSelector } from '../services/hooks';
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const loggedIn = useSelector((store) => store.auth?.loggedIn);
    console.log(loggedIn)
    return (
        <Route
            {...rest}
            render={({ location }) => (
                loggedIn==false ?  (<Redirect to={{ pathname: '/login', state: { from: location } }} />) : (children) 
            )}
        />
    );
}

export default ProtectedRoute;