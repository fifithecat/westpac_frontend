import React, {useRef} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../styles/CommentInput.module.css';

const CommentInput = props => {

  const {
    user,
    getAccessTokenSilently 
  } = useAuth0();
  
  const textInput = useRef(null);

  const addComment = async () => {
    const bodyText = textInput.current.value;
        
    const token = await getAccessTokenSilently();
    let comment = {'postId': props.postId, 'name': user.name, 'email': user.email, 'body': bodyText};

    let response = await fetch('http://localhost:8080/api/comment', {
      method: 'POST',
      body:JSON.stringify(comment),
      headers:{'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`,}

    });
    textInput.current.value = '';
    let res = await response.json();
    let newComment = {'id':res.id, ...comment};
    await props.refreshPostHandler(newComment);
  };

  return (
    <div className={styles['main-container']}>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>Comment: <textarea ref={textInput}></textarea></div>
      <div><button onClick={addComment}>Leave comment</button></div>
    </div>
  );

}

export default CommentInput;