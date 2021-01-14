import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../pages';
import { BasicLayout } from "../layouts";
import PrivateRoute from '@/layouts/privateRoute';
// const renderRoutes = (routes, roles) => {
//   if (!Array.isArray(routes)) return null;
//   return (
//     <Switch>
//       {routes.map((route, index) => {
//         if (route.redirect) {
//           return (
//             <Redirect
//               key={route.path || index}
//               exact={route.exact}
//               strict={route.strict}
//               from={route.path}
//               to={route.redirect}
//             />
//           );
//         }

//         return (
//           <Route
//             key={route.path || index}
//             path={route.path}
//             exact={route.exact}
//             strict={route.strict}
//             render={() => {
//               const renderChildRoutes = renderRoutes(route.childRoutes, roles);
//               let hasPermission = roles >= route.roles;
//               if (route.component) {
//                 return hasPermission ? <route.component route={route}>{renderChildRoutes}</route.component> : <Redirect to='/exception/403' />
//               }
//               return renderChildRoutes;
//             }}
//           />
//         );
//       })}
//     </Switch>
//   );
// };




// const LoginComponent = LoadableComponent(Login)
// const Index = LoadableComponent(Home)

const AppRouter = () => {
  // const roles = useSelector(state => state.user.roles);

  // return <Router>{renderRoutes(routesConfig, roles)}</Router>;
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
