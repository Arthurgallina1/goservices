import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

import Profile from '../Pages/Profile';
import Dashboard from '../Pages/Dashboard';


export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} isPrivate={true}/>
            <Route path="/profile" component={Profile} isPrivate={true}/>

            <Route path="/" component={() => <h1>This page does not exist.</h1>}/>
        </Switch>
    )
}