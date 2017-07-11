import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {increment, decrement} from './actions.js';
import {connect} from 'react-redux';

const buttonStyle = {
  margin: '10px'
};

export const stateKey = 'counter';

// function Counter({onIncrement, onDecrement, value}) {
//   return (
//     <div>
//       <button style={buttonStyle} onClick={onIncrement}>+</button>
//       <button style={buttonStyle} onClick={onDecrement}>-</button>
//       <span>Count: {value}</span>
//     </div>
//   );
// }
const Item = (props)=>{
    return(
        <div>{props.value}</div>
    )
}
class Counter extends React.Component{
    // constructor(props,context){
    //     super(props, context);
    // }
    render(){
        const {onIncrement, onDecrement, value} = this.props;
        // console.log('value:'+value)
        return(
                <div>
                    <button style={buttonStyle} onClick={onIncrement}>+</button>
                    <button style={buttonStyle} onClick={onDecrement}>-</button>
                    <span>Count: {value}</span>
                    <Item value={value}/>
                    <Item value={value}/>
                    <Item value={value}/>
                    <Item value={value}/>
                    <Item value={value}/>
                    <Item value={value}/>
                </div>
            )
    }
}
Counter.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};
// state store
const mapStateToProps = (state) => ({
  value: state[stateKey] || 0
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onIncrement: increment,
  onDecrement: decrement
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

