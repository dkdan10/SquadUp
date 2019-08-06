import React from 'react'
import LogInComponent from './session/login';
import SignUpComponent from './session/sign_up';
import NavBarComponent from './nav_bar/nav_bar';
import FooterComponent from './footer/footer';

import GroupCreateForm from './groups/create_and_edit/create_form_container';
import GroupShowPage from './groups/show/group_show_page';
import GroupEditForm from './groups/create_and_edit/edit_form_container';

import EventCreateForm from './events/create_and_edit/create_event_container';
import EventEditForm from './events/create_and_edit/edit_event_container';
import EventShowPage from './events/show/event_show_page';

import Modal from './modals/modal'

import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import {AuthRoute, ProtectedRoute, SplashRoute} from '../util/route_utils'


export const App = () => (
    <>
        <HashRouter>
            <Modal />
            <NavBarComponent/>
            <div className="all-content">
            <Switch>
                <AuthRoute exact path="/login" component={LogInComponent} />
                <AuthRoute exact path="/signUp" component={SignUpComponent} />

                <ProtectedRoute exact path="/groups/new" component={GroupCreateForm} />
                <ProtectedRoute exact path="/groups/:groupId/edit" component={GroupEditForm} />

                <ProtectedRoute exact path="/groups/:groupId/new/event" component={EventCreateForm} />
                <ProtectedRoute path="/events/:eventId/edit" component={EventEditForm} />

                <Route path="/groups/:groupId" component={GroupShowPage} />
                <Route path="/events/:eventId" component={EventShowPage} />
                
                <SplashRoute path="/"/>
            </Switch>
            </div>
            <FooterComponent/>
        </HashRouter>
    </>
)