import "@/styles/globals.css";
import client  from "../src/apollo-client";
import { ApolloProvider } from '@apollo/client';
import React, { useState, useReducer, useEffect } from 'react';
import { DarkModeContext, reducer } from '../context/DarkModeContext'
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('None');

  
  const initialState = {
    darkMode: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch({ type: 'TOGGLE_DARK_MODE', payload: savedDarkMode === 'true' });
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterByCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSortBy = (e) => {
    setSort(e.target.value);
  };

  const componentProps = {
    ...pageProps,
    search,
    category,
    sort,
    handleSearch,
    handleFilterByCategory,
    handleSortBy,
  };

  return (
    <ApolloProvider client={client}>
    <DarkModeContext.Provider value={{state, dispatch}}>
      <Header />
      <Component {...componentProps} />
    </DarkModeContext.Provider>
    </ApolloProvider>
  );
}
