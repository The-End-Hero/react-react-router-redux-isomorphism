/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {increment, decrement} from './actions.js';
import {connect} from 'react-redux';

const Div = styled.div`
    background: red;
    & .white{
        background: gray;
        font-size: 12px;
        transition:all 0.2s;
        &:hover{
            background: red;  
        }
    }
 
`;

const DivList =styled.div`
    background:#fff;
    padding-bottom: .96rem;
    & img{
        display:block;
        width:100%
    }
    & div{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    & .title{
        font-size:0.533rem;
        line-height:1.1;
        padding-top: .45333rem;
        padding-bottom: .26667rem;
        padding-left: .42667rem;
    }
    & .tags{
        font-size:0.32rem;
        line-height:1.1;
        color:#999;
        padding-left: .42667rem;
    }
`
export const h5stateKey = 'h51';

const Itemarray = (props)=>{
    console.log('props:' +JSON.stringify(props.value))
    const liarray= [];
    for(let i=0;i<props.value.length;i++){
        liarray.push(
            <DivList key={'Divlist'+i}>
                <img key={i+'img'} src={props.value[i].recommendationData.coverImgUrl} alt=""/>
                <div key={i+'title'} className="title">{props.value[i].recommendationData.title}</div>
                <div key={i+'tags'} className="tags">{props.value[i].recommendationData.tags.replace(/,/g,'/')}</div>
            </DivList>
        );
    }
    return (
       <div>
           {liarray}
       </div>
    )
}
class h51_article extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state = {
            value : this.props.value,
        }
    }


    touchmove(event){
        console.log(event);
        console.log(event.target);
        // console.log(event.target.offsetTop);
        // console.log( document.body.scrollHeight );
        console.log('网页被卷进去的高：'+ document.body.scrollTop)
        console.log('页面整体高度：'+ document.body.scrollHeight )
        console.log('窗口高度：'+window.innerHeight)
        // console.log(event.)
        if(window.innerHeight + document.body.scrollTop >= document.body.scrollHeight - 100){
            fetch(`http://127.0.0.1:8888/123`).then(response => {
                if (response.status !== 200) {
                    throw new Error('Fail to fetch h51');
                }
                return response.json();
            }).then(responseJson => {
                // 天气
                // console.log('responseJson.HeWeather5.daily_forecast:'+responseJson.HeWeather5[0].daily_forecast)
                // return responseJson.HeWeather5[0].daily_forecast;
                // return responseJson.dataMap;
                this.setState({
                    value:this.state.value.concat(responseJson.dataMap)
                })
            });
        }
    }
    render(){
        return(
            <Div onTouchMove={this.touchmove.bind(this)}>
                <Itemarray value={this.state.value}/>
                {/*{liarray}*/}
                {/*{*/}
                    {/*this.props.value.map((item) => {*/}
                        {/*<li key={item}>{item.recommendationData.tags}</li>*/}
                    {/*})*/}
                {/*}*/}
                {/*<div onClick={onIncrement}>加</div>*/}
                {/*<div onClick={onDecrement}>减</div>*/}
            </Div>
        );
    }
}
h51_article.propTypes = {
    // onIncrement: PropTypes.func.isRequired,
    // onDecrement: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    console.log('state:'+JSON.stringify(state))
    return {
        value: state[h5stateKey]
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onIncrement: increment,
    onDecrement: decrement
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(h51_article);
// connect后面第二个括号是要添加prop的react组件，
// 第一个括号中的参数是用来改变该组件prop的方法，第一个括号有两个参数，第一个参数是一个函数，返回一个对象，对象的键是该组件的prop属性，值是该prop的值；
// 第二个参数也是一个函数，返回一个对象，对象的键同样是prop的属性名，值是一个redux的dispatch，当这个prop属性被用于触发时，dispatch会改变redux中state的值。
