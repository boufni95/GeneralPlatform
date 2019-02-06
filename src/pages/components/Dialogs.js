import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {FireLogIn,
        FireSignInExt,
        FireSignInRes} from '../../firebase/firebaseLog';
import TextField from '@material-ui/core/TextField';
import PassField from './PasswordInput';
export default class Dialogs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nom:'',
            prenom:'',
            cap:'',
            addresse:'',
            email:'',
            pass1:'',
            pass2:'',
            nomEnt:'',
            fail:false,
            errorMsg:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.SubmitIn = this.SubmitIn.bind(this);
        this.closeDial = this.closeDial.bind(this);
        this.handleFail = this.handleFail.bind(this);
      
    }
    closeDial(e){
        console.log('cloi22ng')
        this.setState({
            fail:false,
            errorMsg:''
        })
        this.props.close(e);
    }
    
    
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    }
    handleFail(err){
        this.setState({
            fail:true,
            errorMsg:err
        })
    }
    SubmitIn(){
        if(this.state.email === '' || this.state.password=== ''){
            this.handleFail('email ou password vide')
        }else{
            if(this.props.openDLog){
                FireLogIn(this.state.email,this.state.pass1,this.closeDial,this.handleFail)
                return
            }
            if(this.props.openDRes || this.props.openDExt){
                if( this.state.nom==='' ||
                    this.state.prenom==='' || 
                    this.state.cap==='' || 
                    this.state.addresse==='' || 
                    this.state.email==='' || 
                    this.state.pass1==='' || 
                    this.state.pass2===''){
                        this.handleFail('tous les camps sont obligatoire')
                        return
                    }else{
                        if(this.state.pass1 !== this.state.pass2){
                            this.handleFail('pas meme password')
                        }else{
                            if(this.props.openDExt){
                                FireSignInExt(this.state.nom,this.state.prenom,this.state.cap,this.state.addresse,this.state.email,this.state.pass1,this.closeDial,this.handleFail)
                            }else{
                                if(this.state.nomEnt===''){
                                    this.handleFail('tous les camps sont obligatoire')
                                    return
                                }else{
                                    FireSignInRes(this.state.nomEnt,this.state.nom,this.state.prenom,this.state.cap,this.state.addresse,this.state.email,this.state.pass1,this.closeDial,this.handleFail)
                                    
                                }
            
                            }
                        }
                        
                    }
                
            }
        }
        //FireLogEmail(this.state.doRegister,this.state.email,this.state.pass,this.ErrorLog,this.props.ClickEmail);
    }
    render(){
        const style={
            padding:5
        }
        return  <div >
                    <Dialog open={this.props.openDLog} onClose={this.closeDial}>
                        <DialogTitle>Login</DialogTitle>
                        <div style={style}>
                            <GridList cellHeight='auto' cols={2} spacing={0}>
                                <GridListTile cols={2}>
                                    <TextField required onChange={this.handleChange('email')} label='email' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={2}>
                                    <PassField onChange={this.handleChange('pass1')} label='password'/>
                                </GridListTile>
                            </GridList>
                            <div style={{textAlign:'center',padding:5}}>
                                <Button onClick={this.SubmitIn}   color = 'primary'>done</Button>
                            </div>
                            {(!this.state.fail)?null:    <Typography variant='h6' align='center' color = 'secondary' >
                                                                {this.state.errorMsg}
                                                            </Typography>}
                        </div>
                    </Dialog>
                    <Dialog open={this.props.openDRes} onClose={this.props.close} scroll='body'>
                        <DialogTitle>Resturateur</DialogTitle>
                        <div style={style}>
                            <GridList cellHeight='auto' cols={2} spacing={0} >
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('nom')}  InputProps={{value:this.state.name}} label='nom' color='primary' fullWidth={true} />
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('prenom')} InputProps={{value:this.state.width}} label='prenom' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('cap')} InputProps={{value:this.state.height}} label='cap' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('addresse')} InputProps={{value:this.state.bgCol}} label='addresse' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('email')} InputProps={{value:this.state.bgCol}} label='email' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <PassField onChange={this.handleChange('pass1')} label='password'/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                <PassField onChange={this.handleChange('pass2')} label='confirme password'/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('nomEnt')} InputProps={{value:this.state.bgCol}} label='nom enterprise' color='primary' fullWidth={true}/>
                                </GridListTile>
                            </GridList>
                            <div style={{textAlign:'center',padding:5}}>
                                <Button onClick={this.SubmitIn}   color = 'primary'>done</Button>
                            </div>
                            {(!this.state.fail)?null:    <Typography variant='h6' align='center' color = 'secondary' >
                                                                {this.state.errorMsg}
                                                            </Typography>}
                        </div>
                    </Dialog>
                    <Dialog open={this.props.openDExt} onClose={this.props.close} scroll='body'>
                        <DialogTitle>Extra</DialogTitle>
                        <div style={style}>
                            <GridList cellHeight='auto' cols={2} spacing={0} >
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('nom')}  InputProps={{value:this.state.name}} label='nom' color='primary' fullWidth={true} />
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('prenom')} InputProps={{value:this.state.width}} label='prenom' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('cap')} InputProps={{value:this.state.height}} label='cap' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('addresse')} InputProps={{value:this.state.bgCol}} label='addresse' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <TextField required onChange={this.handleChange('email')} InputProps={{value:this.state.bgCol}} label='email' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                    <PassField onChange={this.handleChange('pass1')} label='password'/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                <PassField onChange={this.handleChange('pass2')} label='confirme password'/>
                                </GridListTile>
                            </GridList>
                            <div style={{textAlign:'center',padding:5}}>
                                <Button onClick={this.SubmitIn}   color = 'primary'>done</Button>
                            </div>
                            {(!this.state.fail)?null:    <Typography variant='h6' align='center' color = 'secondary' >
                                                                {this.state.errorMsg}
                                                            </Typography>}
                        </div>
                    </Dialog>
                </div>
    }
}