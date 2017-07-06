import React from 'react';
import styled from 'styled-components';
import {view as TopMenu} from '../components/TopMenu';
const Input = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

const App = ({children}) => {
  return (
    <div>
      <TopMenu />
      <div>{children}</div>
      <div>12312312321</div>
      <Input placeholder="@mxstbr" type="text"/>
    </div>
  );
};

export default App;
