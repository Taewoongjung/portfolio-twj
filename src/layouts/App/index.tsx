import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import loadable from "@loadable/component";

const MainPage = loadable(() => import('../../pages/Main'));
const CareerPage = loadable(() => import('../../pages/Career'));

const App = () => {
    return (
        <Switch>
            <Redirect exact path="/" to="/me"/>
            <Route path="/me" component={MainPage}/>
            <Route path="/career" component={CareerPage}/>
        </Switch>
    );
};

export default App;
