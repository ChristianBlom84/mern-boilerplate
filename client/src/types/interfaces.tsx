import { UserRoles } from './enums';

export interface User {
  _id?: string;
  name: string;
  email: string;
  notifications?: Notification[];
  organization?: string;
  password?: string;
  passwordCheck?: string;
  role: UserRoles;
}

export interface Context {
  authStatus: boolean;
  setAuthStatus: (authStatus: boolean) => void;
  role: UserRoles;
  setRole: (role: UserRoles) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
