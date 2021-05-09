import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/CommentInput.module.css';

const CommentInput = props => {

  const {
    isLoading,
    isAuthenticated,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  return (
    <div className={styles.['main-container']}>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Comment: <textarea></textarea></div>
    </div>
  );

}

export default CommentInput;