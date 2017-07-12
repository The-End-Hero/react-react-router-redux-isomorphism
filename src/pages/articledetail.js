/**
 * Created by xiping.wang on 2017/7/12.
 */
/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React from  'react';
import { articledetail1_article as H5article, articledetailstateKey, articledetailreducer} from '../components/articledetail/index';


const Div = styled.div`
    background: deeppink;
`;

export default class articledetail extends React.Component{
    // constructor(props,context){
    //     super(props,context)
    // }

    render(){
        return(
            <Div>
                {/*<div className='white'>123</div>*/}
                <H5article/>
            </Div>
        );
    }
}
articledetail.propTypes = {

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
const articledetailinitState = () => {
    // return fetch(`http://${END_POINT}/api/h51`).then(response => {
    // 天气
    // return fetch(`https://free-api.heweather.com/v5/weather?city=%E4%B8%8A%E6%B5%B7&key=953041d43bbb4394942cf0ec42b3d775`).then(response => {
    // 本地8888mock  useless下
    return fetch(`http://127.0.0.1:8888/articledetail`).then(response => {
        if (response.status !== 200) {
            throw new Error('Fail to fetch h51');
        }
        return response.json();
    }).then(responseJson => {
        // 天气
        // console.log('responseJson.HeWeather5.daily_forecast:'+responseJson.HeWeather5[0].daily_forecast)
        // return responseJson.HeWeather5[0].daily_forecast;
        return responseJson.dataMap;
    });
}

export {articledetail, articledetailreducer, articledetailinitState, articledetailstateKey};
