const RESET_ACTION_TYPE = '@@RESET';

const resetReducerCreator = (reducer, resetState) => (state, action) => {
  if (action.type === RESET_ACTION_TYPE) {
    return resetState;
  } else {
    return reducer(state, action);
  }
};

const reset = (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);

  const reset = (resetReducer, resetState) => {
    const newReducer = resetReducerCreator(resetReducer, resetState);
    store.replaceReducer(newReducer); // 替换store当前用来计算state的reducer。
    store.dispatch({type: RESET_ACTION_TYPE, state: resetState}); // dispatch  分发action。这是触发state变化的惟一途径。
  };

  console.log('--------{...store, reset}----------')
    console.log(...store)
  console.log({...store, reset})
  console.log('--------{...store, reset}----------')
  return {
    ...store,
    reset
  };
};

export default reset;

