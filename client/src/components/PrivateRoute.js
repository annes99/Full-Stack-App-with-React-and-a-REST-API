import React, { Component } from "react";
import { NavLink, Route, Redirect } from 'react-router-dom';
import { Consumer } from '../components/Context';


 const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Consumer>
            {value => (
                //console.log(value.state.isAuthenticated)
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