import React from 'react';
import axios from 'axios';
import './App.scss';
import Login from './components/pages/Login';
import Header from './components/partials/Header';
import Register from './components/pages/Register';
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
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
