import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { App } from "../client/app.tsx";
import {StaticRouter} from "react-router-dom/server";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { Provider } from "react-redux";
import store from "../client/store/index.tsx";
import theme from '../client/style/theme.js';
import createEmotionCache from './createEmotionCache.tsx';
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// const express = require('express')
// const fs = require('fs')
// const path = require('path')

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "./static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);
server.get("/", async (req, res) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
     // Grab the CSS from emotion
  let data = [
    1,2,3,4,5,6,7,8,9
  ]
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <CssBaseline />
        <StaticRouter location={req.url} >
          <App/>
        </StaticRouter>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
); 
const emotionChunks = extractCriticalToChunks(html);
const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  res.render("client", { assets,emotionCss, html });
});


server.get("/content",(req,res)=>{
  res.send({
    content:'12346'
  })
})
server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
