import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, ...rest }) {
    const loggedIn = useSelector(store => store.loggedIn);

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