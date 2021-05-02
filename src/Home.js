import React, { useEffect, useState, useRef } from "react";
import Post from './components/Post';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import styles from './styles/Home.module.css';

let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 150
});

const Home = props => {

const [selectedIndex, setSelectedIndex] = useState(-1);
const [postsExpandStatus, setPostsExpandStatus] = useState({});
const [posts, setPosts] = useState([]);
const tableRef = useRef();
const [comments, setComments] = useState([]);

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

useEffect(()=> {
  console.log('index ' + selectedIndex);
  console.log('prepare update layout');
  if (selectedIndex > 0) {
    //cache.clear(selectedIndex);
    console.log('update layout');
    cache.clearAll();
    tableRef.current.recomputeRowHeights(selectedIndex);
    tableRef.current.forceUpdate();
    tableRef.current.forceUpdateGrid(); 
  }
}, [postsExpandStatus]);

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
          onSelectIndex={{selectedIndex, setSelectedIndex}}></Post>

    
    </CellMeasurer>
  );
}
 
return (

<div className={styles.['list_container']}>
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