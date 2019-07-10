import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../components/Context';

/* PrivateRoute checks if user is authenticated, if not redirects to /api/signin page 
    https://reacttraining.com/react-router/web/example/auth-workflow
*/
const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {value => (
                <Route
                    {...rest}
                    render={props =>
                        value.state.isAuthenticated ? (
                            <Component {...props} />
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/signin",
                                        state: { from: props.location }
                                    }}
                                />
                            )
                    }
                />
            )}
        </Consumer>
    );
}

export default PrivateRoute;