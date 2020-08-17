import React, { Suspense, useCallback } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useMappedState } from 'redux-react-hook';

import LoadingPage from '../components/LoadingPage';
import config from './config';
import Utils from '../utils'

const renderRoutes = (routes, roles) => {
  if (!Array.isArray(routes)) return null;
  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              const renderChildRoutes = renderRoutes(route.childRoutes, roles);
              let hasPermission = Utils.isSubArray(roles, route.roles);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    {hasPermission ? <route.component route={route}>{renderChildRoutes}</route.component>: <Redirect to='/exception/403' />}
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

const AppRouter = () => {
  const mapState = useCallback(state => ({
    roles: state.user.roles,
  }), [roles])
  const { roles } = useMappedState(mapState);
  return <Router>{renderRoutes(config, roles)}</Router>;
};

export default AppRouter;
