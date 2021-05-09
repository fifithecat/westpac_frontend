import logo from './logo.svg';
import React from "react";
import styles from'./styles/App.module.css';
import Home from './Home';
import Greetings from './Greetings';
function App() {

  return (
    <div className={styles.['App']}>
      <div className={styles.['App-greetings']}>
        <div className={styles.['headerLeftDiv']}>I am lazy, even there are 100 items in the list, I keep 10 or less based on your screen size</div>
        <Greetings/>
      </div>
      <Home></Home>
    </div>
  );
}

export default App;
