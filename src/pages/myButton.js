import React from 'react';
import Button from '@material-ui/core/Button';

// We can use inline-style
const style = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

class myButton extends React.Component {
  render(){
    return <Button  style={style}fullWidth={this.props.fullW} onClick={(e)=>{this.props.Click(e,this.props.msg)}}>{this.props.txt}</Button>;
  }
}

export default myButton;
