import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector, RootStateOrAny } from 'react-redux';
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const loggedIn = useSelector((store: RootStateOrAny) => store.auth.loggedIn);

    return (
        <Route
            {...rest}
            render={({ location }) => (
                loggedIn
                ? (children)
                : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            )}
        />
    );
}

export default ProtectedRoute;