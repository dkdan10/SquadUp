import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'
import UserIndex from '../components/temp/user_index';
import NoUserSplash from '../components/no_user_splash/splash'
import UserSplash from '../components/logged_in_splash/splash'

const mSP = (state) => ({
    loggedIn: Boolean(state.session.currentUserId)
});

const Auth = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Redirect to="/" /> : <Component {...props} />
        )}
    />
);

const Protected = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
        )}
    />
)

const Splash = ({ loggedIn, path }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <UserSplash {...props} /> : <NoUserSplash {...props} />
        )}
    />
)

export const AuthRoute = withRouter(connect(mSP)(Auth));
export const ProtectedRoute = withRouter(connect(mSP)(Protected));
export const SplashRoute = withRouter(connect(mSP)(Splash));