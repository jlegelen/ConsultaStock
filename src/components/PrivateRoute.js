import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...otherProps }) => (

    <Route {...otherProps} render={props => (

        sessionStorage.getItem('token') && (!otherProps.requiresAdmin || otherProps.userIsAdmin)
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />

);

export default PrivateRoute;