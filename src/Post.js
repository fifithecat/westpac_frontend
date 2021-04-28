import React from "react";
import styles from './Post.module.css';

const Post = props => {

  return (
    <div  style={props.style} className={styles.['row']}>

      <div className={styles.['content']}>

        <div>{props.id}</div>

        <div>{props.title}</div>

        <div>{props.body}</div>

      </div>

    </div>
  );
}

export default Post;