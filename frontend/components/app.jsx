import React from 'react'
import TempUserIndex from './temp/user_index';
import TempLogInComponent from './session/login';
import TempSignUpComponent from './session/sign_up';
import NavBarComponent from './nav_bar/nav_bar'
import Splash from './no_user_splash/splash'

import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import {AuthRoute, ProtectedRoute} from '../util/route_utils'


export const App = () => (
    <>
        <HashRouter>
            <NavBarComponent/>
            <Switch>
                <AuthRoute path="/login" component={TempLogInComponent} />
                <AuthRoute path="/signUp" component={TempSignUpComponent} />
                <Route path="/" component={Splash}/>
            </Switch>
        </HashRouter>
    </>
)