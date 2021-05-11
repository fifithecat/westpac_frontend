import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/Greetings.module.css';

const Greetings = props => {

  const {
    isLoading,
    isAuthenticated,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <div className={styles['headerRightDiv']}><button onClick={loginWithRedirect}>Login</button></div>;
  }  else return (    
  <div className={styles['headerRightDiv']}>Hello {user.name}&nbsp;
  <a href="/#" onClick={() => logout({ returnTo: window.location.origin })}>Log out</a>
  </div>    
  

  );
}

export default Greetings;