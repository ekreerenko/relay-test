import React, { useState, useCallback } from 'react';
import styles from './Login.module.scss';
import LoginQuery from '../service/mutations/Login.js';

function Login({ isLogged, changeLogged }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = useCallback(() => {
    if (email !== 'ben@cerbs.net' || password !== 'jenova') {
      alert('incorrect email or password');
      return
    }
    LoginQuery(email, password, (token) => {
      localStorage.setItem('authToken', token);
      changeLogged(true);
    })
  }, [email, password, changeLogged]);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('authToken');
    changeLogged(false);
  }, [changeLogged]);


  return (
    <div className={styles.container}>
      {!isLogged && (
        <>
          <div className={styles.inputContainer}>
            <span>
              email:
              </span>
            <input
              onChange={({ target: { value } }) => setEmail(value)}
              value={email} />
          </div>
          <div className={styles.inputContainer}>
            <span>
              password:
              </span>
            <input
              onChange={({ target: { value } }) => setPassword(value)}
              value={password} />
          </div>
          <button onClick={loginHandler}>Login</button>
        </>
      )}
      {isLogged && (
        <button onClick={logoutHandler}>Logout</button>
      )}
    </div>
  );
}

export default Login;
