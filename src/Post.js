import React, {  useState }  from "react";
import styles from './Post.module.css';

const Post = props => {
  const [selected, setSelected] = useState(false);
  const {postsExpandStatus, setPostsExpandStatus} = props.onSelectHandler;
  const {selectedIndex, setSelectedIndex} = props.onSelectIndex;
  const expand = () => {

    let current = postsExpandStatus.[`_${selectedIndex}`];

    setSelected(prevCount => !prevCount)
    setSelectedIndex(props.id);
    if (current === undefined) {
      setPostsExpandStatus({...postsExpandStatus, [`_${props.id}`]: true});
    } else{
      delete postsExpandStatus.[`_${props.id}`];
      setPostsExpandStatus({...postsExpandStatus});
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
        {selected && <div> grdgfdfdgdfgfdgfdgfdgfdg  grdgfdfdgdfgfdgfdgfdgfdg grdgfdfdgdfgfdgfdgfdgfdggrdgfdfdgdfgfdgfdgfdgfdggrdgfdfdgdfgfdgfdgfdgfdggrdgfdfdgdfgfdgfdgfdgfdg</div>}

        

    </div>
  );
}

export default Post;