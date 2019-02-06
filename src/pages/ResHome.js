import React from 'react';
import Map from '../map.PNG'
import Button from './myButton';
import {ButtonPost,
        ButtonLog,
        ButtonFind,
        JobViewBg}from './styles/ResHomeStyles';
import Dialogs from './components/DialogResHome';
import JobView from './components/JobViewer';
import {getJobsRes,getResKeyDB,getExtras,contactExtra} from '../firebase/FirebaseDB';
import { Icon } from '@material-ui/core';
export default class resHomepage extends React.Component{
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
                        findExt:null,
                        openNotif:null};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleJobs = this.handleJobs.bind(this);
        this.contactExtButt = this.contactExtButt.bind(this);
        this.submitContact = this.submitContact.bind(this);
        //this.openNotif = this.openNotif.bind(this);
        //this.closeNotif = this.closeNotif.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  
      }
    
    render(){
        const StyleCont={
            overflow : 'hidden',
            height:(this.state.findExt)?this.state.x*(Object.keys(this.state.findExt).length)/2:this.state.x*(this.state.index)/2,
            
        }
        var elems =[]
        var keys =[]
        if(this.state.findExt){
            elems=Object.values(this.state.findExt)
            keys=Object.keys(this.state.findExt)
        }else{
            for(let i=0; i<this.state.index;i++){
                elems.push(this.state['job'+i])
                keys.push(this.state['keyJ'+i])
            }
        }
        
        return    <div className='imgC' style={StyleCont}>
                        
                        <Dialogs openDLog={this.state.openDLog}  openDPost={this.state.openDPost} close={this.handleClose} mobile={this.state.mobile} logData={this.props.logV}></Dialogs>
                        
                        <div className='bttRes' style={ButtonPost(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="red">
                            <Button txt='POST JOB' fullW={true} Click={this.handleClick} msg='post'/>
                        </div> 
                        <div className='bttLog' style={ButtonLog(this.state.x,this.state.mobile)} color="red" >
                            <Button txt={(this.props.logV)?'LOGOUT':'LOGIN'} fullW={true} Click={this.handleClick} msg='log'/>
                        </div> 
                        <div className='bttExt' style={ButtonFind(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="primary">
                            <Button txt={(this.state.findExt)?'SHOW JOBS':'FIND EXTRA'} fullW={true} Click={this.handleClick} msg={(this.state.findExt)?'show':'find'}/>
                        </div> 
                        <JobView elems={elems} findExt={this.state.findExt} keys={keys} button={(this.state.findExt)?this.contactExtButt:null} res={true}/>
                        
                    </div>
               
    }
    
    /*openNotif = event => {
        this.setState({ openNotif: event.currentTarget });
    }
    closeNotif(){
        this.setState({openNotif:null})
    }*/
    contactExtButt(extKey){
        return <Button txt='contact' fullW={false} Click={this.submitContact} msg={extKey}/>
    }
    submitContact(e,msg){
        getResKeyDB(this.props.logV.uid,keyRes=>{
            contactExtra(msg,keyRes.key,keyRes.val())
            //console.log(keyRes.val())
        })
    }
    handleJobs(val,key){
        this.setState({
            ['job'+this.state.index]:val,
            ['keyJ'+this.state.index]:key,
            index:this.state.index+1,
            
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
                this.setState({openDPost:!this.state.openDPost})
                break
            }
            case 'find':{
                getExtras(val=>{
                    this.setState({findExt:val})
                })
                
                break
            }
            case 'show':{
                this.setState({findExt:null})
                
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

    componentDidUpdate(){
        
    }
    componentDidMount(){
        //
        if(this.state.index===0){
            getResKeyDB(this.props.logV.uid,elem=>{
                getJobsRes(elem.key,(obj,key)=>{
                    this.handleJobs(obj,key)
                })
                
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