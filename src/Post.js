import React, {  useState, useEffect }  from "react";
import styles from './Post.module.css';

const Post = props => {
  const {postsExpandStatus, setPostsExpandStatus} = props.onSelectHandler;
  const {selectedIndex, setSelectedIndex} = props.onSelectIndex;
  const {comments, setComments} = props.postComments;

  const expand = () => {


    let current = postsExpandStatus.[`_${props.id}`];


    if (current === undefined) {

      const postList = [];
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${props.id}`).then(
          response => response.json()
      ).then(responseData => {
        
        for (const key in responseData) {
            postList.push({
            postId: responseData[key].postId,   
            name: responseData[key].name,
            email: responseData[key].email,
            body: responseData[key].body
          });
        }     

        setComments({...comments, [`_${props.id}`]: postList[0]});
        

      }).then(()=> {
        
        console.log(postList[0]);

        setSelectedIndex(props.id);
      }).then(()=> {
        setPostsExpandStatus({...postsExpandStatus, [`_${props.id}`]: true});
      
      });

      
    } else{
      delete postsExpandStatus.[`_${props.id}`];
      setPostsExpandStatus({...postsExpandStatus});
      

      setSelectedIndex(props.id);
    }

  }
  return (
    <div  style={props.style} className={styles.['row']}>

      <div className={styles.['content']}>

        <div>

        <div>{props.id}</div>

        <div>{props.title}</div>

        <div> {props.body}</div>
        
        </div>

       

      </div>
      <div><a href="#"       
              onClick={expand}>{postsExpandStatus.[`_${props.id}`] ? 'collpase' : 'expand'}</a></div>
        {postsExpandStatus.[`_${props.id}`] && <div> {comments.[`_${props.id}`].postId} {comments.[`_${props.id}`].email} {comments.[`_${props.id}`].body}</div>}

        

    </div>
  );
}

export default Post;