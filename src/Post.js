import React, {  useState, useEffect }  from "react";
import styles from './Post.module.css';

const Post = props => {
  const [selected, setSelected] = useState(false);
  const {postsExpandStatus, setPostsExpandStatus} = props.onSelectHandler;
  const {selectedIndex, setSelectedIndex} = props.onSelectIndex;
  const [comments, setComments] = useState(false);


/*   const loadComment = () => {

    //let current = postsExpandStatus.[`_${selectedIndex}`];
    //if (current !== undefined) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${props.id}`).then(
          response => response.json()
      ).then(responseData => {
        const postList = [];
        for (const key in responseData) {
            postList.push({
            postId: responseData[key].postId,   
            name: responseData[key].name,
            email: responseData[key].email,
            body: responseData[key].body
          });
        }     
        
        console.log(postList[0]);
        setComments(postList[0]);
   
      }); 
    //} 

  } */

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
        setComments(postList[0]);
        
        

      }).then(()=> {
        
        console.log(postList[0]);
        
        setSelected(prevCount => !prevCount)
        setSelectedIndex(props.id);
      }).then(()=> {
        setPostsExpandStatus({...postsExpandStatus, [`_${props.id}`]: true});
      
      });

      
    } else{
      delete postsExpandStatus.[`_${props.id}`];
      setPostsExpandStatus({...postsExpandStatus});
      
      setSelected(prevCount => !prevCount)
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
              onClick={expand}>{selected ? 'collpase' : 'expand'}</a></div>
        {selected && <div> {comments.postId} {comments.email} {comments.body}</div>}

        

    </div>
  );
}

export default Post;