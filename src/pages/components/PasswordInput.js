import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

export default class PassInput extends React.Component{
    constructor(props){
        super(props);
        this.state={showPassword:false,
            password : ''};
        this.handleChange=this.handleChange.bind(this);
        this.handleClickShowPassword=this.handleClickShowPassword.bind(this);
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render(){
        return  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="adornment-password">{this.props.label}</InputLabel>
                    <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.props.password}
                    onChange={this.props.onChange}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                        >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                </FormControl>
    }

}