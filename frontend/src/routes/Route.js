import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import AuthLayout from '../Pages/_layouts/auth'
import DefaultLayout from '../Pages/_layouts/default'

import {store} from '../store';

export default function RouteWrapper({ component: Component, isPrivate = false, ...rest }) {
    // const signed = false;
    const { signed } = store.getState().auth;
    // console.log(state)

    if (!signed && isPrivate) {
        return <Redirect to="/" />
    }

    if (signed && !isPrivate){
        return <Redirect to="/dashboard" />
    }
    const Layout = signed ? DefaultLayout : AuthLayout;

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )}/>
    
} 

// RouteWrapper.PropTypes = {
//     isPrivate: PropTypes.bool,
//     component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
// };

// RouteWrapper.defaultProps = {
//     isPrivate: false,
// }