import logo from './logo.svg';
import React from "react";
import styles from'./styles/App.module.css';
import Home from './Home';

function App() {

  return (
    <div className={styles.['App']}>
      <div>I am lazy, even there are 100 items in the list, I keep 10 or less based on your screen size</div>
      <Home></Home>
    </div>
  );
}

export default App;
