import React from "react";
import styles from'./styles/App.module.css';
import Home from './Home';
import Greetings from './components/Greetings';
function App() {

  return (
    <div className={styles['App']}>
      <div className={styles['App-greetings']}>
        <div className={styles['headerLeftDiv']}>A simple fullstack app</div>
        <Greetings/>
      </div>
      <Home></Home>
    </div>
  );
}

export default App;
