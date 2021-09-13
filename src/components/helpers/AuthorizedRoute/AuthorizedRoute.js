import React from "react";
import {Redirect, Route} from "react-router";

const AuthorizedRoute = ({component, ...rest}) => {
    return (
        <div>
        {
            rest.isLogged ?
            <Route {...rest} component={component}/> :
            <Redirect to={'/'} />
        }
        </div>
    );
}

export default AuthorizedRoute;
