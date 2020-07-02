import React, { useState, useContext, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Login.module.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const context = useContext(AuthContext);
  useEffect(() => {
    if (context && context.authStatus) {
      history.push('/message');
    }
  }, [context]);

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/login/`,
        {
          email,
          password
        }
      );

      if (context !== undefined && res.status === 200) {
        context.setAuthStatus(true);
        console.log(res);
        context.setRole(res.data.role);
        history.push('/message');
      }
    } catch (error) {
      console.log(error);
      setError('Login failed. Please check your email and password.');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <h2>Making Waves</h2>
        <p className="preamble">
          Sign in to administrate your organization and send out push
          notifications.
        </p>
        <form
          className={styles.form}
          onSubmit={(e): Promise<void> => onSubmit(e)}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="John@Doe.com"
              onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                setEmail(e.currentTarget.value)
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password123"
              onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                setPassword(e.currentTarget.value)
              }
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        <p className={styles.errorMessage}>{error ? error : null}</p>
      </div>
    </main>
  );
};
export default Login;
