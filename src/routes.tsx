import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from 'context/auth';
import { Login } from 'ui/pages/Login';
import { AppLayout } from 'ui/components/AppLayout';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Login} />
        <PrivateRoute path={'/areaassinante'} component={AppLayout} />
      </Switch>
    </Router>
  );
};

export default Routes;
