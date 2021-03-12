import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";

export const PrivateRoute = ({
                                 isAuthenticated,
                                 component: Component,
                                 ...rest
                             }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={"/"}/>
        )
    )}/>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);