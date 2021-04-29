import React, { useEffect, useState } from "react";
import Post from './Post';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import styles from './Home.module.css';


const rowHeight = 122;
let cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 122
});

const Home = props => {


const [posts, setPosts] = useState([]);

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

    postList[3].body = 'sdgdfgfd fgfdgfdg dfgfdgfdg dgfdgfdgfd gfd repellat aut aperiam totam temporibus autem et architecto magnam ut consequatur qui cupiditate rerum quia soluta dignissimos nihil iure tempore quas est repellat aut aperiam totam temporibus autem et architecto magnam ut consequatur qui cupiditate rerum quia soluta dignissimos nihil iure tempore quas est repellat aut aperiam totam temporibus autem et architecto magnam ut consequatur qui cupiditate rerum quia soluta dignissimos nihil iure tempore quas est repellat aut aperiam totam temporibus autem et architecto magnam ut consequatur qui cupiditate rerum quia soluta dignissimos nihil iure tempore quas est';
    setPosts(postList);
  });
}, []);


const renderRow = ({ index, key, style, parent }) => {
  return (
    <CellMeasurer 
    key={key}
    cache={cache}
    parent={parent}
    columnIndex={0}
    rowIndex={index}>    
    <Post key={key} style={style} id={posts[index].id} title={posts[index].title} body={posts[index].body}></Post>
    </CellMeasurer>
  );
}
 
return (

<div className={styles.['list']}>
<AutoSizer>
{
  ({ width, height }) => {
    return <List
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