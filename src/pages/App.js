import React from 'react';

import {view as TopMenu} from '../components/TopMenu';

const TopMenu = styled.div`
    background:red;
    
`
const App = ({children}) => {
  return (
    <div>
      <TopMenu />
      <div>{children}</div>
    </div>
  );
};

export default App;