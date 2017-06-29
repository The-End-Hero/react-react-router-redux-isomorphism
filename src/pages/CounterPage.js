import React from 'react';
import {view as Counter, stateKey, reducer} from '../components/Counter';

const page = () => {
  return (
    <div>
      <div>Counter</div>
      <Counter value={0} />
    </div>
  );
};

// 端口号  如果环境变量没有，则默认值9000
const END_POINT = process.env.HOST_NAME || 'http://123.206.206.21:9000';

// 初始化state
const initState = () => {
  return fetch(`http://${END_POINT}/api/count`).then(response => {
    if (response.status !== 200) {
      throw new Error('Fail to fetch count');
    }
    return response.json();
  }).then(responseJson => {
    return responseJson.count;
  });
}

export {page, reducer, initState, stateKey};
