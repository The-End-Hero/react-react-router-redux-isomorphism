import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, match} from 'react-router';
// Provider 包装 注入store
import {Provider} from 'react-redux';
// combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
import {combineReducers} from 'redux';
// 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import {syncHistoryWithStore} from 'react-router-redux';

import App from './pages/App.js';
import {configureStore} from './Store.js';

const store = configureStore();
const win = global.window;

/*
const createElement = (Component, props) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
*/

const getHomePage = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./pages/Home.js').default);
  }, 'home');
};

const getAboutPage = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./pages/About.js').default);
  }, 'about');
};

const getCounterPage = (nextState, callback) => {
  require.ensure([], function(require) {
    const {page, reducer, stateKey, initState} = require('./pages/CounterPage.js');
    const dehydratedState = (win && win.DEHYDRATED_STATE);
    const state = store.getState();
    const mergedState = {...dehydratedState, ...state};
    const statePromise = mergedState[stateKey]
      ? Promise.resolve(mergedState[stateKey])
      : initState();

    statePromise.then((result) => {
      store.reset(combineReducers({
        ...store._reducers,
        [stateKey]: reducer
      }), {
        ...state,
        [stateKey]: result
      });

      callback(null, page);
    });
  }, 'counter');
};
const getH51Page = (nextState, callback) => {
    require.ensure([], function(require) {
        const {h51, h5reducer, h5stateKey, h5initState} = require('./pages/H5-hm-1.js');
        const dehydratedState = (win && win.DEHYDRATED_STATE);
        const state = store.getState();
        const mergedState = {...dehydratedState, ...state};
        const statePromise = mergedState[h5stateKey]
            ? Promise.resolve(mergedState[h5stateKey])
            : h5initState();
        statePromise.then((result) => {
            store.reset(combineReducers({
                ...store._reducers,
                [h5stateKey]: h5reducer
            }), {
                ...state,
                [h5stateKey]: result
            });
            callback(null, h51);
        });
    }, 'h51');
};
// const getAboutPage = (nextState, callback) => {
//     require.ensure([], function(require) {
//         callback(null, require('./pages/About.js').default);
//     }, 'about');
// };
const getNotFoundPage = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./pages/NotFound.js').default);
  }, '404');
};

const history = syncHistoryWithStore(browserHistory, store);
//const history = browserHistory;

// routes 路由变量
const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={getHomePage} />
    <Route path="home" getComponent={getHomePage} />
    <Route path="counter" getComponent={getCounterPage} />
    <Route path="about" getComponent={getAboutPage} />
    <Route path="h51" getComponent={getH51Page}/>
    <Route path="*" getComponent={getNotFoundPage} />
  </Route>
);

export const renderRoutes = (domElement) => {
  // 前后端match函数匹配
  match({history, routes}, (err, redirectLocation, renderProps) => {
    ReactDOM.render(
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>,
      domElement
    );
  });
};



