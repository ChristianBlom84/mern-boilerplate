import React, { useState, MouseEvent } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();

  const onSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER}/api/users/add/`, {
        name,
        email,
        password
      })
      .then(() => {
        history.push('/login');
      });
  };

  return (
    <main className="container">
      <h1>Register</h1>
      <div>
        <div>
          <form className="container form">
            <label>User name</label>
            <input
              type="text"
              name="username"
              id=""
              placeholder="Please enter name"
              onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                setName(e.currentTarget.value)
              }
            />
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Please enter a valid email address"
              id=""
              onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                setEmail(e.currentTarget.value)
              }
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Please a enter password"
              id=""
              onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                setPassword(e.currentTarget.value)
              }
            />
            <button onClick={(e): void => onSubmit(e)}>Register</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
