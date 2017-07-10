/**
 * Created by xiping.wang on 2017/7/10.
 */
import styled from 'styled-components';
import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {increment, decrement} from './actions.js';
import {connect} from 'react-redux';

const Div = styled.div`
    background: green;
    & .white{
        background: red;
    }
`;
export const stateKey = 'counter';

export default class h51_article extends React.Component{
    constructor(props,context){
        super(props,context)
    }

    render(){
        const {onIncrement, onDecrement, value} = this.props;
        return(
            <Div>
                2222
                <div className='white'>123</div>
                {onIncrement}
                {onDecrement}
                {value}
            </Div>
        );
    }
}
h51_article.propTypes = {
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
    value: state[stateKey] || 0
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onIncrement: increment,
    onDecrement: decrement
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(h51_article);

