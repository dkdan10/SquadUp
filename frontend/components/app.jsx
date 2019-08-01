import React from 'react'
import LogInComponent from './session/login';
import SignUpComponent from './session/sign_up';
import NavBarComponent from './nav_bar/nav_bar'

import GroupCreateForm from './groups/create/group_create_form'
import GroupShowPage from './groups/show/group_show_page';

import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import {AuthRoute, ProtectedRoute, SplashRoute} from '../util/route_utils'


export const App = () => (
    <>
        <HashRouter>
            <NavBarComponent/>
            <Switch>
                <AuthRoute exact path="/login" component={LogInComponent} />
                <AuthRoute exact path="/signUp" component={SignUpComponent} />
                <ProtectedRoute exact path="/groups/new" component={GroupCreateForm} />
                <Route path="/groups/:groupId" component={GroupShowPage} />
                <SplashRoute path="/"/>
            </Switch>
        </HashRouter>
    </>
)