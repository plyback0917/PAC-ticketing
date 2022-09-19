import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Mypage from "routes/Mypage";
import { Redirect } from 'react-router';
import Ticketing from "routes/Ticketing";

// setting up router that will initially lead the users to Auth if they are no logged in, and redirecting the users to Home when logged in.
const WebRouter = ({isLoggedIn}) => {
    return (
    < Router>
    {isLoggedIn && <Navigation/> }
        <Switch>
            {isLoggedIn? (
            <>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/Mypage">
                <Mypage/>   
            </Route>
            <Route exact path="/Ticketing">
                <Ticketing/>   
            </Route>
            </>
            ) : (
                <>
                <Route exact path="/">
                    <Auth/>
                </Route>
                <Redirect from = "*" to="/"/>
            </>

            )}
        </Switch>
    </Router>
    );
};

export default WebRouter;