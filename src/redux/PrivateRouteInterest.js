import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouteInterest({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user') || !localStorage.getItem('interest')) {
                return <Redirect to={{ pathname: '/check', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />
    );
}

export { PrivateRouteInterest };