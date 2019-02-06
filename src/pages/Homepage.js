import React from 'react';
import Map from '../map.PNG'
import './Homepage.css';
import Button from './myButton';
import {ButtonExt,
        ButtonLog,
        ButtonRes}from './styles/HomeStyles';
import Dialogs from './components/Dialogs';
import {Redirect} from 'react-router-dom';
export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state = {  scrollY:0,
                        x:0,
                        y:0,
                        mobile:false,
                        openDLog:false,
                        openDRes:false,
                        openDExt:false};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  
      }
    
    render(){
        const StyleCont={
            overflow : 'hidden',
            height:this.state.y,
        }
        return      <div className='imgC' style={StyleCont}>
                        <Dialogs openDLog={this.state.openDLog}  openDRes={this.state.openDRes} openDExt={this.state.openDExt} close={this.handleClose} mobile={this.state.mobile}></Dialogs>
                        <div className='bttRes' style={ButtonRes(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="red">
                            <Button txt='je suis Restaurateur' fullW={true} Click={this.handleClick} msg='res'/>
                        </div> 
                        <div className='bttLog' style={ButtonLog(this.state.x,this.state.mobile)} color="red" >
                            <Button txt={(this.props.logV)?'LOGOUT':'LOGIN'} fullW={true} Click={this.handleClick} msg='log'/>
                        </div> 
                        <div className='bttExt' style={ButtonExt(this.state.x,this.state.y,this.state.scrollY,this.state.mobile)} color="primary">
                            <Button txt='je suis Extra' fullW={true} Click={this.handleClick} msg='ext'/>
                        </div> 
                        <img src={Map} alt='image' className='img'  />
                        
                    </div>
               
    }
    handleClick(e,mesg){
        switch (mesg){
            case 'log':{
                if(this.props.logV){
                    this.props.logOut()
                }else{
                    this.setState({openDLog:!this.state.openDLog})
                }
                
                break
            }
            case 'ext':{
                this.setState({openDExt:!this.state.openDExt})
                break
            }
            case 'res':{
                this.setState({openDRes:!this.state.openDRes})
                break
            }
        }
    }
    handleClose(){
        console.log('cloing')
        this.setState({
            openDLog:false,
            openDRes:false,
            openDExt:false 
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