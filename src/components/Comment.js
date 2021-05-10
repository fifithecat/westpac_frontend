import React from "react";
import styles from '../styles/Comment.module.css';

const Comment = props => {

  return (
    <div className={styles['main-container']}>

        <div>Comment ID: {props.id}</div>

        <div>Comment for Post ID: {props.postId}</div>

        <div>Comment by: {props.name}</div>

        <div>Email: {props.email}</div>

        <div>Body: {props.body}</div>
      
    </div>
  );
}

export default Comment;