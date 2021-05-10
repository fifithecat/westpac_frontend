import React  from "react";
import styles from '../styles/Post.module.css';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { useAuth0 } from '@auth0/auth0-react';

const Post = props => {
  const {postsExpandStatus, setPostsExpandStatus} = props.onSelectHandler;
  const {selectedIndex, setSelectedIndex} = props.onSelectIndex;
  const {comments, setComments} = props.postComments;
  const {commentAble, setCommentAble} = props.onShowCommentBox;

  const {
    isAuthenticated
  } = useAuth0();

  const expand = () => {

    let current = postsExpandStatus.[`_${props.id}`];

    if (current === undefined) {

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
    <div  style={props.style} className={styles['row']}>

      <div className={styles['content']}>

        <div>

        <div>Post Id: {props.id}</div>

        <div>User Id: {props.userId}</div>

        <div>Post Title: {props.title}</div>

        <div>Post Body: {props.body}</div>
        
        </div>
        
      </div>
      <div>
        {isAuthenticated && commentAble? <div><CommentInput postId={props.id}/></div> : <div>Please login to leave comment</div>}
      </div>
      <div>
        { props.commentCount > 0 && <a href="#" onClick={expand}>{postsExpandStatus.[`_${props.id}`] ? 'collpase' : `Show ${props.commentCount} comments`}</a>} 
        {/*<a href="#" onClick={expand}>{postsExpandStatus.[`_${props.id}`] ? 'collpase' : `Show comments`}</a>*/}
      </div>
      
        {postsExpandStatus.[`_${props.id}`] && 
          comments.[`_${props.id}`].map(
          (comment) => <Comment id={comment.id} postId={comment.postId} name={comment.name} email={comment.email} body={comment.body}></Comment>) 
        }


        

    </div>
  );
}

export default Post;