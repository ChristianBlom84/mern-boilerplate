import React, { useState, useEffect, useContext, useRef } from 'react';
import styles from './Header.module.scss';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import Menu from './Menu';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const context = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const prevLocation = useRef(location);

  const handleClose = (): void => {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 200);
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    if (location !== prevLocation.current && menuOpen) {
      handleClose();
    }
    prevLocation.current = location;
  }, [location]);

  return (
    <header className={styles.header}>
      {context && context.authStatus ? (
        <button className={styles.menuIcon} onClick={(): void => handleClose()}>
          {menuOpen && !menuClosing ? <CloseIcon /> : <MenuIcon />}
        </button>
      ) : null}
      <div
        className={styles.headerContainer}
        style={
          context && context.authStatus && window.innerWidth > 767
            ? { marginLeft: '-36px' }
            : {}
        }
      >
        <h1>Project Name</h1>
      </div>
      {menuOpen ? <Menu menuOpen={menuOpen} menuClosing={menuClosing} /> : null}
    </header>
  );
};

export default withRouter(Header);
