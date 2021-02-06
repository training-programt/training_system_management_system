import React from 'react';
import './index.less'
import '@/public/css/page.less'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import routesConfig from '@/routers/config'

const MainContent = props => {

  const renderRoutes = (routes) => {
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
              key={route.path || route.key}
              path={route.path}
              exact
              render={() => {
                const renderChildRoutes = renderRoutes(route.childRoutes);
                if (route.component) {
                  return <route.component route={route}>{renderChildRoutes}</route.component>
                }
                return renderChildRoutes;
              }}
            />
          );
        })}
      </Switch>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%', padding: '0 16px', overflow: 'auto' }}>
      {renderRoutes(routesConfig)}
    </div>
  )
}

export default MainContent
// export default MainContent;