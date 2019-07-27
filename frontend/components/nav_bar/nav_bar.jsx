import React from 'react';
import {Link} from 'react-router-dom'

export default () => {
    

    return (
        <header className="nav-bar">
            <h1>Squad Up</h1>

            <div>
                <Link className="nav-link" to="login">Log in</Link>
                <Link className="nav-link" to="signup">Sign up</Link>
            </div>
        </header>
    )
}