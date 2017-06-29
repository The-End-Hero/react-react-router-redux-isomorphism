//import {createStore, compose} from 'redux';
//const reducer = f => f;
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer} from 'react-router-redux';

import resetEnhancer from './enhancer/reset.js';

const configureStore = () => {
  const originalReducers = {
    routing: routerReducer
  }
  // combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。
  const reducer = combineReducers(originalReducers);

  const win = global.window;

  const middlewares = [];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant')());
  }

  const storeEnhancers = compose(
    resetEnhancer,
    applyMiddleware(...middlewares),
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
  );

  // createStore(reducer, [initialState], enhancer)
    // reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
    // [initialState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
    // enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
  const store = createStore(reducer, {}, storeEnhancers);
  store._reducers = originalReducers;

  return store;
}

export {configureStore};

