import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {getResKeyDB,addJob} from '../../firebase/FirebaseDB';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
export default class Dialogs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mission:'',
            cap:'',
            addresse:'',
            startT:'',
            endT:'',
            fail:false,
            errorMsg:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.SubmitIn = this.SubmitIn.bind(this);
        this.closeDial = this.closeDial.bind(this);
        this.handleFail = this.handleFail.bind(this);
      
    }
    closeDial(e){
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
        
        if(this.state.mission=='' ||
            this.state.cap=='' ||
            this.state.addresse =='' ||
            this.state.startT=='' ||
            this.state.endT==''){
                this.handleFail('tout est necessaire')
            }else{
                getResKeyDB(this.props.logData.uid,snap=>{
                    addJob(this.state,snap.key,this.props.close)
                })
            }
        //getResDB(this.props.logData.uid)
        }
    render(){
        const style={
            padding:5
        }
        return  <div >
                    
                    <Dialog open={this.props.openDPost} onClose={this.props.close} scroll='body'>
                        <DialogTitle>Resturateur</DialogTitle>
                        <div style={style}>
                            <GridList cellHeight='auto' cols={4} spacing={0} >
                                <GridListTile cols={(this.props.mobile)?4:2}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    value={this.state.mission}
                                    onChange={this.handleChange('mission')}
                                    fullWidth={true}
                                    helperText="mission"
                                    >
                                        <MenuItem key='0' value='mission A'>
                                            mission A
                                        </MenuItem>
                                        <MenuItem key='1' value='mission B'>
                                            mission B
                                        </MenuItem>
                                        <MenuItem key='2' value='mission C'>
                                            mission C
                                        </MenuItem>
                                    </TextField>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?4:2}>
                                    <TextField required onChange={this.handleChange('cap')} InputProps={{value:this.state.height}} label='cap' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?4:2}>
                                    <TextField required onChange={this.handleChange('addresse')} InputProps={{value:this.state.bgCol}} label='addresse' color='primary' fullWidth={true}/>
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                <TextField
                                    id="time"
                                    label="start time"
                                    type="time"
                                    value={this.state.startT}
                                    onChange={this.handleChange('startT')}
                                    fullWidth={true}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 600, // 10 min
                                    }}
                                />
                                </GridListTile>
                                <GridListTile cols={(this.props.mobile)?2:1}>
                                <TextField
                                    id="time"
                                    label="end time"
                                    type="time"
                                    value={this.state.endT}
                                    onChange={this.handleChange('endT')}
                                    fullWidth={true}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 600, // 10 min
                                    }}
                                />
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