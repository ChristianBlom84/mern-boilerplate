import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { AuthContext } from '../../context/authContext';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../partials/Spinner';
import styles from './Message.module.scss';

const Message: React.FC<RouteComponentProps> = ({ history }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  const context = useContext(AuthContext);

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');

    if (message) {
      setDisabled(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/push/send`,
          {
            message
          }
        );
        setMessage('');
        setDisabled(false);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setError('The message field cannot be empty.');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <main className={styles.main}>
      {context !== undefined && context.authStatus !== false ? (
        <div>
          <h2>Making Waves</h2>
          <p className="preamble">
            Sign in to administrate your organization and send out push
            notifications.
          </p>
          <form
            className={styles.form}
            onSubmit={(e): Promise<void> => onSubmit(e)}
          >
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              spellCheck={false}
              rows={8}
              cols={window.innerWidth > 767 ? 55 : 30}
              value={message}
              placeholder="Please enter a message..."
              onChange={(e: React.FormEvent<HTMLTextAreaElement>): void =>
                setMessage(e.currentTarget.value)
              }
            />
            <button className={styles.button} disabled={isDisabled}>
              {isDisabled ? <Spinner /> : 'Send'}
            </button>
          </form>
          <p className={styles.errorMessage}>{error ? error : null}</p>
        </div>
      ) : context && !context.authStatus ? (
        <Redirect to="/" />
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default Message;
