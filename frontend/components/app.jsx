import React from 'react'
import TempUserIndex from './temp/user_index';
import TempLogInComponent from './temp/login';
import TempSignUpComponent from './temp/sign_up';
import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../util/route_utils'

export const App = () => (
    <>
        <HashRouter>
            <Link to="/login">Log in</Link>
            <Link to="/signUp">Sign Up</Link>
            <Switch>
                <AuthRoute path="/login" component={TempLogInComponent} />
                <AuthRoute path="/signUp" component={TempSignUpComponent} />
            </Switch>
            <ProtectedRoute path="/" component={TempUserIndex}/>
        </HashRouter>
    </>
)