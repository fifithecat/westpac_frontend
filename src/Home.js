import React, { useEffect, useState, useRef, useCallback } from "react";
import Post from './components/Post';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader} from "react-virtualized";
import styles from './styles/Home.module.css';

import { useAuth0 } from '@auth0/auth0-react';

let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 150
});

const Home = props => {

const [postsExpandStatus, setPostsExpandStatus] = useState({});
const [posts, setPosts] = useState({});
const tableRef = useRef();
const [comments, setComments] = useState([]);
const [commentAble, setCommentAble] = useState(false);
const [postIdRetrieveIndex, setPostIdRetrieveIndex] = useState(0);
const {
  isLoading,
  isAuthenticated
} = useAuth0();

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

const IsRowLoaded = ({index})=>{ return !!posts[index]}

const LoadMoreRows = ( {startIndex, stopIndex} ) => {  
  fetch(`http://localhost:8080/api/someposts?startIndexId=${startIndex + 1}&endIndexId=${stopIndex + 1}`).then( 
      response => response.json()
  ).then(responseData => {
    const postList = {};
    for (const key in responseData) {
        Object.assign(postList, {[responseData[key].id-1]: {id: responseData[key].id,
          userId: responseData[key].userId,
          title: responseData[key].title,
          body: responseData[key].body,
          commentCount: responseData[key].commentCount}});
    }  
    // let postss =    {...posts, ...postList};
    //   console.log(postss);
    setPosts({...posts, ...postList});
    
    setPostIdRetrieveIndex(postIdRetrieveIndex => postIdRetrieveIndex + 10);
    refresh();
  }).catch(error => {
    console.error('Error:', error);
  });
  //let promiseResolver;
  return Promise.resolve();
}

const renderRow = ({ index, key, style, parent }) => {
  
  let postId = 'loading';
  let postUserId = 'loading';
  let postTitle = 'loading';
  let commentCount = undefined;
  let commentBody = 'loading';

  if (!IsRowLoaded({index})) {
    //console.log("Loading");
  } else  {
    postId = posts[index].id;
    postUserId = posts[index].userId;
    postTitle = posts[index].title;
    commentCount = posts[index].commentCount
    commentBody = posts[index].body;
  }
  //console.log(posts);
  return (
    <CellMeasurer 
    key={key}
    cache={cache}
    parent={parent}
    columnIndex={0}
    rowIndex={index}>  
 
      {({ measure, registerChild }) => 
    <Post key={key} 
    refParam={registerChild}
    style={style} 
    id={postId} 
    userId={postUserId}
    title={postTitle} 
    body={commentBody} 
    commentCount={commentCount}
    postComments={{comments, setComments}}
    onSelectHandler={{postsExpandStatus, setPostsExpandStatus}} 
    onShowCommentBox={commentAble}
    onRefreshLayout={refresh}
    onLoad={measure} ></Post> 
      }
      </CellMeasurer> 
  );
}
// registerChild - https://nicedoc.io/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md#user-content-using-registerchild 
return (
  <div className={styles['list_container']}>
    <InfiniteLoader
    isRowLoaded={({ index}) => !!posts[index]}
    loadMoreRows={LoadMoreRows}
    rowCount={100}
    threshold={0}
    >
    {({onRowsRendered, registerChild}) => (
      <AutoSizer>  
        {({ width, height }) => {
          return (<List
          width={width}
          height={height}
          ref={tableRef}
          rowCount={100}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={renderRow}
          overscanRowCount={0}
          onRowsRendered={onRowsRendered} 
          />);
        }}
      </AutoSizer>
    )}
    </InfiniteLoader>
  </div>

);
}

export default Home; 