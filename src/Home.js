import React, { useEffect, useState, useRef, useCallback } from "react";
import Post from './components/Post';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import styles from './styles/Home.module.css';

import { useAuth0 } from '@auth0/auth0-react';

let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 150
});

const Home = props => {

const [postsExpandStatus, setPostsExpandStatus] = useState({});
const [posts, setPosts] = useState([]);
const tableRef = useRef();
const [comments, setComments] = useState([]);
const [commentAble, setCommentAble] = useState(false);
const {
  isLoading,
  isAuthenticated
} = useAuth0();

useEffect(() => {
  fetch('http://localhost:8080/api/posts').then(
      response => response.json()
  ).then(responseData => {
    const postList = [];
    for (const key in responseData) {
        postList.push({
        id: responseData[key].id,
        userId: responseData[key].userId,
        title: responseData[key].title,
        body: responseData[key].body,
        commentCount: responseData[key].commentCount
      });
    }     
    setPosts(postList);
  });
}, []);

const refresh = useCallback(() => {
  console.log('refresh layout becoz index ');
  cache.clearAll();
  tableRef.current.forceUpdate();
  tableRef.current.forceUpdateGrid(); 
}, [])

useEffect(   
  ()=> {
    if (!isLoading && isAuthenticated) {
    Promise.resolve()
    .then(()=>{setCommentAble(true)})
    .then(()=>refresh())
    }
  }
, [isAuthenticated, isLoading, refresh]); 

useEffect(() => {
  let timeout;
  const handleResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      refresh();
    }, 200);
  }
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, [refresh]);

const renderRow = ({ index, key, style, parent }) => {
  return (
    <CellMeasurer 
    key={key}
    cache={cache}
    parent={parent}
    columnIndex={0}
    rowIndex={index}>    
    <Post key={key} 
          style={style} 
          id={posts[index].id} 
          userId={posts[index].userId}
          title={posts[index].title} 
          body={posts[index].body} 
          commentCount={posts[index].commentCount}
          postComments={{comments, setComments}}
          onSelectHandler={{postsExpandStatus, setPostsExpandStatus}} 
          onShowCommentBox={commentAble}
          onRefreshLayout={refresh}></Post>     
    </CellMeasurer>
  );
}
 
return (

<div className={styles['list_container']}>
<AutoSizer>
{
  ({ width, height }) => {
    return <List
      ref={tableRef}
      width={width}
      height={height}
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={renderRow}
      rowCount={posts.length}
      overscanRowCount={0} />
  }
}
</AutoSizer>
</div>

  );
}

export default Home;