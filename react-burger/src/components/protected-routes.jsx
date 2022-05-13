import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {
    const loggedIn = useSelector(store => store.auth.loggedIn);
    const location = useLocation()
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