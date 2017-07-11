/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React from  'react';
import { h51_article as H5article, h5stateKey, h5reducer} from '../components/H5_article/index';


const Div = styled.div`
    background: deeppink;
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
                <H5article/>
            </Div>
        );
    }
}
h51.propTypes = {

};
// let isbrowser;
// if(typeof window !== 'undefined'){
//     isbrowser = true;
// }else{
//     isbrowser = false;
// }
// 端口号  如果环境变量没有HOST_NAME，则给默认值
// const END_POINT = process.env.HOST_NAME || (isbrowser ? '127.0.0.1:9000':'123.206.206.21:9000');
// console.log('111111111111-------------11111111111--------------111111111111')
// console.log(process.env.HOST_NAME)
// 初始化state
const h5initState = () => {
    // return fetch(`http://${END_POINT}/api/h51`).then(response => {
    return fetch(`https://free-api.heweather.com/v5/weather?city=%E4%B8%8A%E6%B5%B7&key=953041d43bbb4394942cf0ec42b3d775`).then(response => {
        if (response.status !== 200) {
            throw new Error('Fail to fetch h51');
        }
        return response.json();
    }).then(responseJson => {
        console.log('responseJson.HeWeather5.daily_forecast:'+responseJson.HeWeather5[0].daily_forecast)
        return responseJson.HeWeather5[0].daily_forecast;
    });
}

export {h51, h5reducer, h5initState, h5stateKey};
