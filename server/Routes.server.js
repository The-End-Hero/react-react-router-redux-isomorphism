// react react-dom/server react-router react-redux redux
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Router, Route, match, RouterContext, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import { ServerStyleSheet } from 'styled-components'; // styled-components的服务端渲染
// store
import {configureStore} from '../src/Store.js';

// 引入页面组件
import App from '../src/pages/App.js';
import Home from '../src/pages/Home.js';
import {page as CounterPage, reducer, stateKey, initState} from '../src/pages/CounterPage.js';
import About from '../src/pages/About.js';
import NotFound from '../src/pages/NotFound.js';
import h51 from '../src/pages/h5-hm-1'


const sheet = new ServerStyleSheet()
// routes变量，准备给match函数匹配
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="counter" component={CounterPage} />
    <Route path="about" component={About} />
    <Route path="h51" component={h51}/>
    <Route path="*" component={NotFound} />
  </Route>
);

const pathInitData = {
  '/counter': {
    stateKey,
    reducer,
    initState
  }
}

function safeJSONstringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

function renderMatchedPage(req, res, renderProps, assetManifest) {
  const store = configureStore();
  const path= renderProps.location.pathname;
  const pathInfo = pathInitData[path] || {};
  const {stateKey, reducer, initState} = pathInfo;
  const statePromise = (initState) ? initState() : Promise.resolve(null);

  statePromise.then((result) => {
    if (stateKey) {
      const state = store.getState();
      store.reset(combineReducers({
        ...store._reducers,
        [stateKey]: reducer
      }), {
        ...state,
        [stateKey]: result
      });
    }

    // react-redux Provider标签包裹，注入store
    const appHtml = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
    );
    // 提取出styled-components style标签 ，并且写入到ejs的head里面
    const css = sheet.getStyleTags()
    // console.log('我是css：'+css)
    const dehydratedState= store.getState();

    return res.render('index', {
      title: 'Sample React App',
      PUBLIC_URL: '/',
      assetManifest: assetManifest,
      appHtml: appHtml,
      dehydratedState: safeJSONstringify(dehydratedState),
      appStyle: css,
    });
  });
}

export const renderPage = (req, res, assetManifest) => {
  // match函数  react-router  同构前后端路由匹配
  match({routes: routes, location: req.url}, function(err, redirect, renderProps) {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (redirect) {
      return res.redirect(redirect.pathname + redirect.search);
    }

    if (!renderProps) {
      return res.status(404).send('Not Found');
    }

    return renderMatchedPage(req, res, renderProps, assetManifest);
  });
};

