import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserRoles } from '../../context/authContext';
import UserList from '../partials/UserList';
import UserModal from '../partials/UserModal';
import Spinner from '../partials/Spinner';
import styles from './Users.module.scss';

export interface Notification {
  _id: string;
  message: string;
  user: string;
  organization?: string;
  date: Date;
}
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

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>();
  const [editing, setEditing] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [editInfo, setEditInfo] = useState<User | undefined>();

  const fetchUsers = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/users/all`
      );
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return users ? (
    <main className={styles.main}>
      {editing ? (
        <UserModal
          editInfo={editInfo}
          setEditing={setEditing}
          setEditInfo={setEditInfo}
          users={users}
          setUsers={setUsers}
          newUser={newUser}
        />
      ) : null}
      <div className={styles.userList}>
        <h2>Making Waves</h2>
        <h3>Users:</h3>
        <UserList
          setEditing={setEditing}
          setEditInfo={setEditInfo}
          users={users}
          newUser={newUser}
          setNewUser={setNewUser}
        />
      </div>
    </main>
  ) : (
    <Spinner />
  );
};

export default Users;
