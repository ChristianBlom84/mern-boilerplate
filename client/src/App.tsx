import React from 'react';
import axios from 'axios';
import './App.scss';
import Login from './components/pages/Login';
import Header from './components/partials/Header';
import Register from './components/pages/Register';
import Users from './components/pages/Users';
import Subscribers from './components/pages/Subscribers';
import Message from './components/pages/Message';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthContextProvider from './context/authContext';

const App: React.FC = () => {
  axios.defaults.withCredentials = true;

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <AdminRoute path="/users" exact component={Users} />
        <PrivateRoute path="/subscribers" exact component={Subscribers} />
        <PrivateRoute path="/message" exact component={Message} />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
