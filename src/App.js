import React, { useState } from 'react';

import styles from './App.module.scss';
import Login from './components/Login.js';
import Main from './components/Main.js';

function App() {
  const [isLogged, setLogged] = useState(!!localStorage.getItem('authToken'));
  return (
    <div className={styles.container}>
      <Login isLogged={isLogged} changeLogged={setLogged} />
      {isLogged && (
        <Main />
      )}
      
    </div>
  );
}

export default App;
