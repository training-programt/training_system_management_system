import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../pages';
import { BasicLayout } from "../layouts";
import PrivateRoute from '@/layouts/privateRoute';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/' component={BasicLayout} />
      </Switch>
    </Router>
  )
};

export default AppRouter;
