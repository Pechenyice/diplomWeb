import React from "react";
import {Redirect, Route} from "react-router";

const AuthorizedRoute = ({isLogged, component, location, path}) => {
    return (
        <div>
        {
            isLogged ?
            <Route path={path} component={component}/> :
            <Redirect to={{
                pathname: '/auth',
                state: { from: location }
            }} />
        }
        </div>
    );
}

export default AuthorizedRoute;
