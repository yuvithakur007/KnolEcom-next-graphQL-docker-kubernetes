import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { useDarkMode } from '../context/DarkModeContext'; 
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/src/services/mutations';
import {router} from  "next/router";

const Login = () => {
  const { state } = useDarkMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.error('hey2');
    try {
      const { data } = await login({
        variables: {
          email,
          password
        },
      });

      const { token } = data.login;
      // console.log('token:', token);
      localStorage.setItem('token', token);

      const userName= email.split("@")[0];
      // console.log('userName:', userName);
      localStorage.setItem('userName', userName);

      localStorage.setItem('email', email);

      alert('Login successful!'); router.push('/');

    } catch (error) {
      console.log(email,password);
      console.error('hey3');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.loginBox}>
        <div className={styles.loginContainer}>
          <p>Login</p>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br />
            <button type="submit" className={styles.login}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
