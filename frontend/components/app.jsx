import React from 'react'
import TempUserIndex from './temp/user_index';
import TempLogInComponent from './temp/login';
import TempSignUpComponent from './temp/sign_up';
import { Switch, Route, HashRouter, Link } from 'react-router-dom'

export const App = () => (
    <>
        <HashRouter>
            <Link to="/login">Log in</Link>
            <Link to="/signUp">Sign Up</Link>
            <Switch>
                <Route path="/login" component={TempLogInComponent} />
                <Route path="/signUp" component={TempSignUpComponent} />
            </Switch>
            <Route path="/" component={TempUserIndex}/>
        </HashRouter>
    </>
)