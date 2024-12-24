import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import {HashRouter as Router} from "react-router-dom";
// import createEmotionCache from "../server/createEmotionCache";
import theme from "./style/theme.js";
import  {Provider}  from 'react-redux'
import store from './store/index.tsx'
console.log(store,'12345')
// const cache = createEmotionCache();
function Main() {
    return (
    // <CacheProvider value={cache}>
    
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
       </ThemeProvider>
    // </CacheProvider>
    );
  }
ReactDOM.hydrate(
  <Main/>
, document.getElementById("root"));
