import React from 'react'
import TempUserIndex from './temp/user_index';
import TempSignInComponent from './temp/sign_in';
import TempSignUpComponent from './temp/sign_up';
import { Switch, Route, HashRouter, Link } from 'react-router-dom'

export const App = () => (
    <>
        <HashRouter>
            <Link to="/signIn">Sign In</Link>
            <Link to="/signUp">Sign Up</Link>
            <Switch>
                <Route path="/signIn" component={TempSignInComponent} />
                <Route path="/signUp" component={TempSignUpComponent} />
            </Switch>
        </HashRouter>

        <TempUserIndex/>
    </>
)