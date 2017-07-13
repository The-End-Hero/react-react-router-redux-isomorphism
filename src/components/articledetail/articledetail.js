/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {increment, decrement} from './actions.js';
import {connect} from 'react-redux';

const Divarticle = styled.div`
    h3{
        padding-top: .8rem;
        padding-bottom: .4rem;
        line-height: 1.4;
        color: #444;
        font-size:0.8rem;
    }
    img{
        display:block;
        width:100%;
        margin: .8rem 0;
    }
    .detail{
        margin-bottom: .21333rem;
        padding-left: .42667rem;
        padding-right: .42667rem;
        padding-bottom: 1.2rem;
    }
    p{
        font-size:0.4266rem;
        color: #444;
        line-height: 1.625;
    }
`;
export const articledetailstateKey = 'articledetail';

const Itemarray = (props)=>{
    console.log('props:' +JSON.stringify(props.value))
    return (
       <div className="detail">
           {/*{liarray}*/}
           <h3>{props.value.title}</h3>
           <div dangerouslySetInnerHTML={{__html: props.value.content.replace(/<\/script/g,'<\\/script').replace(/<!--/g,'<\\!--')}}></div>

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
        return(
            <Divarticle>
                <Itemarray value={this.state.value}/>
            </Divarticle>
        );
    }
}
h51_article.propTypes = {
    // onIncrement: PropTypes.func.isRequired,
    // onDecrement: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    console.log('state:'+JSON.stringify(state))
    return {
        value: state[articledetailstateKey]
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
