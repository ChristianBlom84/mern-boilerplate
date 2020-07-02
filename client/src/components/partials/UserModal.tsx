import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import styles from './UserModal.module.scss';
import { User } from '../pages/Users';

interface Props {
  editInfo: User | undefined;
  setEditInfo: (user: User | undefined) => void;
  setEditing: (state: boolean) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  newUser: boolean;
}

const UserModal: React.FC<Props> = ({
  editInfo,
  setEditInfo,
  setEditing,
  users,
  setUsers,
  newUser
}: Props) => {
  const [formData, setFormData] = useState({
    name: editInfo ? editInfo.name : '',
    email: editInfo ? editInfo.email : '',
    password: '',
    passwordCheck: '',
    role: editInfo ? editInfo.role : 0
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setBackgroundVisible(true);
    }, 10);
  }, []);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    setEditing(false);
    setEditInfo(undefined);
  };

  const updateUser = async (e: React.FormEvent): Promise<void> => {
    if (formData.password && formData.passwordCheck !== formData.password) {
      setError('Passwords do not match.');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER}/api/users/update`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );

      if (res.status === 200) {
        const newUsers = users.map(user => {
          if (user._id === res.data._id) {
            return res.data;
          }
          return user;
        });
        setUsers(newUsers);
      }

      setTimeout(() => {
        setSending(false);
        setSuccessMessage('Changes successfully saved!');
        setTimeout(() => {
          setEditing(false);
        }, 1200);
      }, 400);
    }
  };

  const createUser = async (e: React.FormEvent): Promise<void> => {
    if (formData.password && formData.passwordCheck !== formData.password) {
      setError('Passwords do not match.');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      try {
        const res = await axios.post<User>(
          `${process.env.REACT_APP_SERVER}/api/users/add`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
          }
        );

        setUsers([...users, res.data]);
        setTimeout(() => {
          setSending(false);
          setSuccessMessage('Changes successfully saved!');
          setTimeout(() => {
            setEditing(false);
          }, 1200);
        }, 400);
      } catch (error) {
        console.error(error.message);
        setTimeout(() => {
          setSending(false);
          setSuccessMessage('Could not create user.');
          setTimeout(() => {
            setEditing(false);
          }, 1200);
        }, 400);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSending(true);
    if (newUser) {
      await createUser(e);
    } else {
      await updateUser(e);
    }
  };

  const handleDelete = async (): Promise<void> => {
    setSending(true);

    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER}/api/users/delete/${
          editInfo ? editInfo.email : ''
        }`
      );

      if (res.status === 200) {
        const newUsers = users.filter(user => {
          return user._id !== res.data._id;
        });
        setUsers(newUsers);
      }

      setTimeout(() => {
        setSending(false);
        setSuccessMessage('User successfully deleted!');
        setTimeout(() => {
          setEditing(false);
        }, 1200);
      }, 400);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className={`${styles.background} ${
        backgroundVisible ? styles.fadeIn : ''
      }`}
      onClick={(e): void => handleCloseModal(e)}
    >
      <div
        className={`${styles.modal} ${
          successMessage ? styles.successMessage : ''
        } ${backgroundVisible ? styles.growIn : ''}`}
        onClick={(e): void => e.stopPropagation()}
      >
        {!successMessage ? (
          <form className={styles.form} action="post" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e): void =>
                setFormData({ ...formData, name: e.currentTarget.value })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e): void =>
                setFormData({ ...formData, email: e.currentTarget.value })
              }
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder={'Password123'}
              onChange={(e): void =>
                setFormData({ ...formData, password: e.currentTarget.value })
              }
            />
            <span className={styles.error}>{error ? error : null}</span>
            <label htmlFor="passwordCheck">Retype Password:</label>
            <input
              type="password"
              name="passwordcheck"
              value={formData.passwordCheck}
              placeholder={'Password123'}
              onChange={(e): void =>
                setFormData({
                  ...formData,
                  passwordCheck: e.currentTarget.value
                })
              }
            />
            {error ? <span className={styles.error}>{error}</span> : null}
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e): void => {
                setFormData({
                  ...formData,
                  role: Number(e.currentTarget.value)
                });
              }}
            >
              <option value={0}>Standard</option>
              <option value={1}>Administrator</option>
            </select>
            {sending ? (
              <Spinner />
            ) : (
              <div className={styles.ctaButtons}>
                <button className={styles.button} type="submit">
                  Save
                </button>
                {editInfo ? (
                  <button
                    className={`${styles.delete} ${styles.button}`}
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            )}
          </form>
        ) : successMessage ? (
          <span>{successMessage}</span>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default UserModal;
