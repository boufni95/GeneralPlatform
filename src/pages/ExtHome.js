import React from 'react';
import Map from '../map.PNG'
import Button from './myButton';
import {ButtonPost,
        ButtonLog,
        ButtonFind,
        ButtNotExt}from './styles/ResHomeStyles';
import Dialogs from './components/DialogResHome';
import JobView from './components/JobViewer';
import IconButton from '@material-ui/core/IconButton';
import NotifIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import {getJobs,sendCand,getExtKeyDB,getJobWithKey,
    extNotiSeen} from '../firebase/FirebaseDB';
export default class extHomepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  scrollY:0,
                        x:0,
                        y:0,
                        mobile:false,
                        openDLog:false,
                        openDPost:false,
                        openDFind:false,
                        index:0,
                        extKey:'',
                        openNotif:null,
                        seen:true,
                        contacts:null};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleJobs = this.handleJobs.bind(this);
        this.submitJobButt = this.submitJobButt.bind(this);
        this.submitClick = this.submitClick.bind(this);
        this.openNotif = this.openNotif.bind(this);
        this.closeNotif = this.closeNotif.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  
      }
    
    render(){
        const StyleCont={
            overflow : 'hidden',
            height:/*(this.state.mobile)?0:*/this.state.x*(this.state.index)/2,
            
        }
        
        
        
        return    <div className='imgC' style={StyleCont}>
                        <div style={ButtNotExt(this.state.x,this.state.mobile)}>
                                    <IconButton onClick={this.openNotif}>
                                        <Badge variant="dot" badgeContent='' invisible={this.state.seen} color='secondary'>
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
                                    {this.state.contacts && Object.values(this.state.contacts).map((val,i)=>{
                                        return <MenuItem key={i} onClick={this.handleClose}>{'contact: '+val.nomEnt}</MenuItem>
                                    })}
                                    
                                    
                                </Menu>
                        
                        <div className='bttLog' style={ButtonLog(this.state.x,this.state.mobile)} color="red" >
                            <Button txt={(this.props.logV)?'LOGOUT':'LOGIN'} fullW={true} Click={this.handleClick} msg='log'/>
                        </div> 
                        <div className='bttExt' style={ButtonFind(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="primary">
                            <Button txt='AGENDA' fullW={true} Click={this.handleClick} msg='find'/>
                        </div> 
                        <JobView elems={this.state.jobs} keys={this.state.keys} button={this.submitJobButt}/>
                        
                    </div>
               
    }
    openNotif = event => {
        this.setState({ openNotif: event.currentTarget });
        extNotiSeen(this.state.extKey)

    }
    closeNotif(){
        this.setState({openNotif:null})
    }
    submitJobButt(JobKey,jobCand){
        if(!jobCand){
            return <Button Click={this.submitClick} txt='Postulez' msg={JobKey} />
        }
        if(!jobCand[this.state.extKey]){
            return <Button Click={this.submitClick} txt='Postulez' msg={JobKey} />
        }
     
        
        
    }
    submitClick(e,msg){
        getExtKeyDB(this.props.logV.uid,key=>{
            //console.log(key.key)
            sendCand(key.key,msg,key.val())
            //console.log()
        })
        console.log(msg)
    }
    handleJobs(val){
        var arr = Object.values(val)
        var keys = Object.keys(val)
        this.setState({
            jobs:arr,
            keys:keys,
            index:arr.length
        })
    }
    handleClick(e,mesg){
        switch (mesg){
            case 'log':{
                if(this.props.logV){
                    this.props.logOut()
                }else{
                    //this.setState({openDLog:!this.state.openDLog})
                }
                
                break
            }
            case 'post':{
                //this.setState({openDPost:!this.state.openDPost})
                break
            }
            case 'find':{
                //this.setState({openDFind:!this.state.openDFind})
                break
            }
        }
    }
    handleClose(){
        console.log('cloing')
        this.setState({
            openDLog:false,
            openDFind:false,
            openDPost:false 
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
        //
        getExtKeyDB(this.props.logV.uid,key=>{
            const val = key.val()
            this.setState({extKey:key.key,
                            seen:val.seen,
                            contacts:val.Contacts})
        })
        if(this.state.index===0){
            getJobs(val=>{
                this.handleJobs(val)
                console.log(val)
            })
        }
        
        this.updateWindowDimensions();
        window.addEventListener('scroll',this.handleScroll);
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('scroll',this.handleScroll);
    }
}
/*{this.props.jobData.Candidatures && 
                                        Object.values(this.props.jobData.Candidatures).map((val,i)=>{

                                            return <MenuItem key={i} onClick={this.handleClose}>{'Condidat: '+val.nom+' '+val.prenom+' '+val.cap}</MenuItem>
                                        }) }*/
/*<Dialogs openDLog={this.state.openDLog}  openDPost={this.state.openDPost} openDFind={this.state.openDFind} close={this.handleClose} mobile={this.state.mobile} logData={this.props.logV}></Dialogs>
                        <div className='bttRes' style={ButtonPost(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="red">
                            <Button txt='BBTT' fullW={true} Click={this.handleClick} msg='post'/>
                        </div> */