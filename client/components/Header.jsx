import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../styles/header.module.css';
import { useDarkMode } from '../context/DarkModeContext';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState(null);
  const { state, dispatch } = useDarkMode(); 

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token") !== null;
    setIsLoggedIn(userLoggedIn);
    if (userLoggedIn) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3030/api/user/userDetails", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' }); 
  };

  return (
    <header className={state.darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.navbar}>
        <nav>
          <ul className={styles.navbarLinks}>
            <li >
              <Link href="/">Home</Link>
            </li>
            <li >
              <Link href="/cart">Cart</Link>
            </li>
            <li >
              <Link href="/orders">Orders</Link>
            </li>
          </ul>
        </nav>
        
            <button  className={styles.darkmodeButton} onClick={toggleDarkMode}>
              {state.darkMode ? 'Light Mode' : 'Dark Mode'} 
            </button>
 

        <button  className={styles.loginButton} onClick={() => setToggle(!toggle)}>
          {isLoggedIn ? (
            <>
              <div>{userData ? userData?.user?.email.split("@")[0] : null}</div>
              {toggle && (
                <div className={styles.logoutButton}>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
