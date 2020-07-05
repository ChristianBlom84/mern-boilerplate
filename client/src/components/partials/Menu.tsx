import React, { useEffect, useState, useContext, MouseEvent } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { UserRoles } from '../../types/enums';
import Spinner from './Spinner';
import styles from './Menu.module.scss';

interface Props {
  menuOpen: boolean;
  menuClosing: boolean;
}

const Menu: React.FC<Props> = ({ menuOpen, menuClosing }) => {
  const [delayedOpen, setDelayedOpen] = useState(false);
  const context = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (menuOpen) {
      setTimeout(() => {
        setDelayedOpen(true);
      }, 50);
    }
  }, [menuOpen]);

  const handleLogout = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/auth/logout`
    );
    if (context) {
      context.setAuthStatus(false);
    }
    history.push('/');
  };

  return context ? (
    <nav
      className={`${styles.menu} ${
        delayedOpen && !menuClosing ? styles.open : ''
      }`}
    >
      <Link to="#">Page1</Link>
      <Link to="#">Page2</Link>
      {context.role === UserRoles.Admin ? (
        <Link to="#">Admin Only Page</Link>
      ) : null}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  ) : (
    <Spinner />
  );
};

export default Menu;
