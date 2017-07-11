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
export const h5stateKey = 'h51';

const Itemarray = (props)=>{
    console.log('props:' +JSON.stringify(props.value))
    const liarray= [];
    for(let i=0;i<props.value.length;i++){
        liarray.push(
            <li key={i}>{props.value[i].recommendationData.tags}</li>
        );
    }
    return (
       <div className='white'>
           233
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

    render(){
        // const {onIncrement,onDecrement} = this.props;
        // const liarray= [];
        // for(let i=0;i<this.state.value.length;i++){
        //     liarray.push(
        //         <div key={i}>{this.state.value[i].recommendationData.tags}</div>
        //     );
        // }
        return(
            <Div>
                2222
                <div className='white'>123</div>
                <Itemarray value={this.props.value}/>
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
