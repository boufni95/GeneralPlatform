import React from 'react';
import {JobViewBg,
        SingleJobBg,ButtonNot} from '../styles/JobViewerStyles';
import { Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import NotifIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import {jobCandSeen} from '../../firebase/FirebaseDB';

export default class JobViewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {  scrollY:0,
                        x:0,
                        y:0,
                        mobile:false,
                        clientX:0,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.touchBegin = this.touchBegin.bind(this);
        this.touchMove = this.touchMove.bind(this);
        
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  
      }
      render(){
          
        
          return <div style={JobViewBg(this.state.x,this.state.y,this.state.mobile)} onTouchStart={this.touchBegin} onTouchMove={this.touchMove}>
                   
                   {this.props.elems && this.props.elems.map((val,i)=>{
                       return (this.props.findExt)?<SingleExt key={i} keys={this.props.keys} screen={this.state} data={val} index={i} button={this.props.button}/>
                       :
                       <SingleJob key={i} keys={this.props.keys} screen={this.state} jobData={val} index={i} button={this.props.button} res={this.props.res}/>
                   })}     
                 </div>
      }
      
      handleClick(){

      }
      touchBegin(event){
          console.log(event.changedTouches[0].clientX)
        this.setState({
            clientX:event.changedTouches[0].clientX,
        })
      }
      touchMove(event){
            window.scrollBy(0,this.state.clientX-event.changedTouches[0].clientX)
            
            this.setState({
                clientX:event.changedTouches[0].clientX
            })
      }
      handleScroll(event){
        this.setState({scrollY :window.scrollY });
        //console.log(this.state.offY);
    }
    updateWindowDimensions() {
        if(window.innerWidth/window.innerHeight < 1/* || window.innerWidth <700*/){
            this.setState({mobile:true});
        }else{
            this.setState({mobile:false})
        }
        this.setState({ x: window.innerWidth, y: window.innerHeight });
      }
    componentDidMount(){
        
        this.updateWindowDimensions();
        window.addEventListener('scroll',this.handleScroll);
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('scroll',this.handleScroll);
    }
}

class SingleJob extends React.Component{
    constructor(props){
        super(props)
        this.state={
            openNotif:null
        }
        this.openNotif = this.openNotif.bind(this);
        this.closeNotif = this.closeNotif.bind(this);
    }
    openNotif = event => {
        this.setState({ openNotif: event.currentTarget });
        jobCandSeen(this.props.keys[this.props.index])

    }
    closeNotif(){
        this.setState({openNotif:null})
    }
    render(){
        return <Paper style={SingleJobBg(this.props.screen.x,this.props.screen.y,this.props.screen.scrollY,this.props.screen.mobile,this.props.index)}>
                {(this.props.res)?<div><div style={ButtonNot(this.props.screen.x,this.props.screen.mobile)}>
                                    <IconButton onClick={this.openNotif}>
                                        <Badge variant="dot" badgeContent='' invisible={this.props.jobData.seen} color='secondary'>
                                            <NotifIcon/>
                                        </Badge>
                                    </IconButton>
                                </div>
                            
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.openNotif}
                                    open={Boolean(this.state.openNotif)}
                                    onClose={this.closeNotif}
                                    >
                                    {this.props.jobData.Candidatures && 
                                        Object.values(this.props.jobData.Candidatures).map((val,i)=>{

                                            return <MenuItem key={i} onClick={this.handleClose}>{'Condidat: '+val.nom+' '+val.prenom+' '+val.cap}</MenuItem>
                                        }) }
                                </Menu></div>:null}
                <Typography variant='h6' align='center'>
                    Mission
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.jobData.mission}
                </Typography>
                <Typography variant='h6' align='center'>
                    Addresse
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.jobData.cap+' '+this.props.jobData.addresse}
                </Typography>
                <Typography variant='h6' align='center'>
                    Temp du-au
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.jobData.startT+'-'+this.props.jobData.endT}
                </Typography>
                <div style={{textAlign:'center'}}>
                {this.props.button && this.props.button(this.props.keys[this.props.index],this.props.jobData.Candidatures)}
                
                </div>
            </Paper>
    }
}
class SingleExt extends React.Component{
    render(){
        return <Paper style={SingleJobBg(this.props.screen.x,this.props.screen.y,this.props.screen.scrollY,this.props.screen.mobile,this.props.index)}>
                <Typography variant='h6' align='center'>
                    Nom
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.data.nom}
                </Typography>
                <Typography variant='h6' align='center'>
                    Prenom
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.data.prenom}
                </Typography>
                <Typography variant='h6' align='center'>
                    Cap
                </Typography>
                <Typography variant='body2' align='center'>
                    {this.props.data.cap}
                </Typography>
                <div style={{textAlign:'center'}}>
                {this.props.button && this.props.button(this.props.keys[this.props.index])}
                </div>
            </Paper>
    }
}