import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/CommentInput.module.css';

const CommentInput = props => {

  const {
    user,
    getAccessTokenSilently 
  } = useAuth0();

  const addComment = async () => {
    console.log('add comment');
    const token = await getAccessTokenSilently();
    let comment = {'postId': props.postId, 'name': user.name, 'email': user.email, 'body': 'abc'};

    let response = await fetch('http://localhost:8080/api/comment', {
      method: 'POST',
      body:JSON.stringify(comment),
      headers:{'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`,}

    });

    let res = await response.json();
    let newComment = {'id':res.id, ...comment};
    await props.refreshPostHandler(newComment);
  };

  return (
    <div className={styles['main-container']}>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Comment: <textarea></textarea></div>
      <div><button onClick={addComment}>Leave comment</button></div>
    </div>
  );

}

export default CommentInput;