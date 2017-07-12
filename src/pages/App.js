import React from 'react';
// import styled from 'styled-components';
import {view as TopMenu} from '../components/TopMenu';

const marginTop = {
    marginTop:'1.17333rem'
}
const App = ({children}) => {
  return (
    <div>
      <TopMenu />
      <div style={marginTop}>{children}</div>
      {/*<div>12312312321</div>*/}
      {/*<Input placeholder="@mxstbr" type="text"/>*/}
    </div>
  );
};

export default App;
