import React, { useEffect, useState, useRef } from "react";
import Post from './Post';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import styles from './Home.module.css';


const rowHeight = 122;
let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 150
});

const Home = props => {

const [selectedIndex, setSelectedIndex] = useState(-1);
const [postsExpandStatus, setPostsExpandStatus] = useState({});
const [posts, setPosts] = useState([]);
const tableRef = useRef();

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts').then(
      response => response.json()
  ).then(responseData => {
    const postList = [];
    for (const key in responseData) {
        postList.push({
        id: responseData[key].id,
        title: responseData[key].title,
        body: responseData[key].body
      });
    }     
    setPosts(postList);
  });
}, []);

useEffect(()=> {
  if (selectedIndex > 0) {
    // cache.clear(selectedIndex);
    console.log('update layout');
    cache.clearAll();
    tableRef.current.recomputeRowHeights(selectedIndex);
    //tableRef.current.forceUpdate();
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
          title={posts[index].title} 
          body={posts[index].body} 
          onSelectHandler={{postsExpandStatus, setPostsExpandStatus}} 
          onSelectIndex={{selectedIndex, setSelectedIndex}}></Post>

    
    </CellMeasurer>
  );
}
 
return (

<div className={styles.['list']}>
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
      overscanRowCount={3} />
  }
}
</AutoSizer>
</div>

  );
}

export default Home;