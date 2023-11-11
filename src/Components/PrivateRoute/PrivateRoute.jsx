import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuth = () => {
        return localStorage.getItem('accessToken') !== null;
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}