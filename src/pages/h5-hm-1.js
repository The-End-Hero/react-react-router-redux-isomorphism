/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React from  'react';
import { h51_article, stateKey, reducer} from '../components/Counter';


const Div = styled.div`
    background: green;
    & .white{
        background: red;
    }
`;

export default class h51 extends React.Component{
    // constructor(props,context){
    //     super(props,context)
    // }

    render(){
        return(
            <Div>
                2222
                {/*<div className='white'>123</div>*/}
                <h51_article value={0}/>
            </Div>
        );
    }
}
h51.propTypes = {

};
let isbrowser;
if(typeof window !== 'undefined'){
    isbrowser = true;
}else{
    isbrowser = false;
}
// 端口号  如果环境变量没有HOST_NAME，则给默认值
const END_POINT = process.env.HOST_NAME || (isbrowser ? '127.0.0.1:9000':'123.206.206.21:9000');
// console.log('111111111111-------------11111111111--------------111111111111')
// console.log(process.env.HOST_NAME)
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

export {h51, reducer, initState, stateKey};
