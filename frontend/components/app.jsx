import React from 'react'
import TempUserIndex from './temp/user_index';
import TempLogInComponent from './session/login';
import TempSignUpComponent from './session/sign_up';
import NavBarComponent from './nav_bar/nav_bar'

import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import {AuthRoute, ProtectedRoute, SplashRoute} from '../util/route_utils'


export const App = () => (
    <>
        <HashRouter>
            <NavBarComponent/>
            <Switch>
                <AuthRoute exact path="/login" component={TempLogInComponent} />
                <AuthRoute exact path="/signUp" component={TempSignUpComponent} />
                <SplashRoute path="/"/>
            </Switch>
        </HashRouter>
    </>
)