import React, { useState, createContext } from 'react';
import { UserRoles } from '../types/enums';
import { Context } from '../types/interfaces';

export const AuthContext = createContext<Context | undefined>(undefined);

const AuthContextProvider: React.FC = props => {
  const [authStatus, setAuthStatus] = useState(false);
  const [role, setRole] = useState(UserRoles.Standard);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ authStatus, setAuthStatus, role, setRole, loading, setLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
