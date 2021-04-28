import React, { useEffect, useState } from "react";
import Post from './Post';
import { List, AutoSizer } from "react-virtualized";
import styles from './Home.module.css';


const rowHeight = 122;


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
    setPosts(postList);
  });
}, []);


const renderRow = ({ index, key, style }) => {
  return (
    <Post key={key} style={style} id={posts[index].id} title={posts[index].title} body={posts[index].body}></Post>
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
      rowHeight={rowHeight}
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