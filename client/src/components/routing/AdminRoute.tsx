/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UserRoles } from '../../context/authContext';
import { checkCurrentUser } from '../../utils/CheckCurrentUser';

interface Props extends RouteProps {
  component: any;
}

const AdminRoute = (props: Props) => {
  const { component: Component, ...rest } = props;
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (context && !context.authStatus) {
      (async () => {
        try {
          const user = await checkCurrentUser();
          if (user) {
            context.setAuthStatus(true);
            context.setRole(user.role);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      })();
    }
  }, [context]);

  return context && !loading ? (
    <Route
      {...rest}
      render={routeProps =>
        context && context.authStatus && context.role === UserRoles.Admin ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  ) : null;
};

export default AdminRoute;
