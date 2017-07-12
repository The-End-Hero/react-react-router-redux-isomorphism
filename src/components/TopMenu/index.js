import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';

const DivTop = styled.div`
    font-size: 17px;
    color: #444;
    text-align: center;
    height: 1.17333rem;
    line-height: 1.17333rem;
    position: fixed;
    left: 0;
    border-bottom: 1px solid #999;
    width: 100%;
    top: 0rem;
    z-index: 20;
    background:#fff;
    .topul{
      font-size:0;
      li{
          display:inline-block;
          height:100%;
          width:25%;
          font-size:17px;
      }
    }
    
`

const view = () => {
  return (
    <DivTop>
      <ul className="topul">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/h51">h51</Link></li>
      </ul>
    </DivTop>
  );
};

export {view};
