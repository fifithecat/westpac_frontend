import React, {useEffect, useState}  from "react";
import styles from '../styles/Post.module.css';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useAuth0 } from '@auth0/auth0-react';

const Post = props => {
  const {postsExpandStatus, setPostsExpandStatus} = props.onSelectHandler;
  const {comments, setComments} = props.postComments;
  const commentAble = props.onShowCommentBox;
  const [commentCount, setCommentCount] = useState(props.commentCount);


  const {
    isAuthenticated
  } = useAuth0();

  useEffect(() => {
    if (commentCount === undefined) {
      setCommentCount(()=>props.commentCount);
    }
  }, [props.commentCount]);

  const refreshPost = (newComment) => {

    let currentStatus = postsExpandStatus.[`_${props.id}`];

    fetch(`http://localhost:8080/api/post?id=${props.id}`).then(
        response => response.json()
    ).then(responseData => {

        setCommentCount(responseData.commentCount);
        //setCommentsCount({...commentsCount, [`_${props.id}`]: responseData.commentCount});
      }         
    )    
    .then(()=> {
        if (currentStatus === true) {
          const currentPostComment = [{...newComment}, ...comments.[`_${props.id}`] ];      
          setComments({...comments, [`_${props.id}`]: currentPostComment});
        }
      }
    )
    .then(() => {
      if (currentStatus === true) {
        props.onRefreshLayout()
      }
    }  
    );
  };

  const expand = () => {

    let current = postsExpandStatus.[`_${props.id}`];

    if (current === undefined) {
      console.log('in current undefined');
      const postList = [];
      fetch(`http://localhost:8080/api/comments?postId=${props.id}`).then(
          response => response.json()
      ).then(responseData => {
        
        for (const key in responseData) {
            postList.push({
            id: responseData[key].id,
            postId: responseData[key].postId,   
            name: responseData[key].name,
            email: responseData[key].email,
            body: responseData[key].body
          });
        }     

        setComments({...comments, [`_${props.id}`]: postList});
        
      }).then(()=> {       
        console.log('props.id ' + props.id); 
        setPostsExpandStatus({...postsExpandStatus, [`_${props.id}`]: true}); 
        props.onRefreshLayout(); 
      });      
    } else{
      console.log('in current else');
      delete postsExpandStatus.[`_${props.id}`];
      setPostsExpandStatus({...postsExpandStatus});
      props.onRefreshLayout();
    }

  }
  return (
    <div  style={props.style} className={styles['row']} ref={props.refParam}>

      <div className={styles['content']}>

        <div>

        <div>Post Id: {props.id}</div>

        <div>User Id: {props.userId}</div>

        <div>Post Title: {props.title}</div>

        <div>Post Body: {props.body}</div>
        


        </div>
        
      </div>
      <div>
        {isAuthenticated && commentAble? <div><CommentInput postId={props.id} refreshPostHandler={refreshPost}/></div> : <div>Please login to leave comment</div>}
      </div>
      <div>
        {  commentCount === undefined ? 'Show comments: loading' : (commentCount > 0 && <a href="/#" onClick={expand}>{postsExpandStatus.[`_${props.id}`] ? 'collpase' : `Show ${commentCount} comments`}</a>) }
        {/* {commentsCount.[`_${props.id}`] === 'loading' ? 'Show comments: loading' : (commentsCount.[`_${props.id}`] > 0 && <a href="/#" onClick={expand}>{postsExpandStatus.[`_${props.id}`] ? 'collpase' : `Show ${commentsCount.[`_${props.id}`]} comments`}</a>)}  */}
      </div>
      
        {postsExpandStatus.[`_${props.id}`] && 
          comments.[`_${props.id}`].map(
          (comment) => <Comment key={comment.postId + ' ' + comment.id} id={comment.id} postId={comment.postId} name={comment.name} email={comment.email} body={comment.body}></Comment>) 
        }        
    </div>
  );
}

export default Post;