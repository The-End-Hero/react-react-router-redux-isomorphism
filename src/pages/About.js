import React from 'react';
// import { render } from 'react-dom';
import styled from 'styled-components'
const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
`;
// function fn(x){
//   console.log(x)
// }
// const Form = () => {
//     return (
//         <Input
//             placeholder="Hover here..."
//             innerRef={x => (this.input = x)}
//             onMouseEnter={() => this.input.focus()}
//         />
//     );
// };

class Form extends React.Component {
    render = () =>
        <Input
            placeholder="Hover here..."
            innerRef={x => (this.input = x)}
            onMouseEnter={() => this.input.focus()}
        />;
}
const About = () => {
  return (
    <div>About
      <Form/>
    </div>
  );
};

export default About;
