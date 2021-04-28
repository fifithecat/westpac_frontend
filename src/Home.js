import React, { useEffect, useState } from "react";
import Post from './Post';

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
        console.log(responseData[key].id + ' ' + responseData[key].title);
      }
      console.log(postList.length);
      setPosts(postList);
      console.log(postList);
    });
  }, []);
     
console.log(posts);

console.log(posts.length);
console.log(posts[0]);

  return (
    <div>
        {posts.map(post => (        
              <Post key={post.id} title={post.title} body={post.body}/>        
        ))} 


    </div>
  );
}

export default Home;