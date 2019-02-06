import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import Home from './pages/Homepage';
import ResHome from './pages/ResHome';
import ExtHome from './pages/ExtHome';
import './App.css';
import firebase from './firebase/firebaseInit';


class App extends Component {
  constructor(props){
    super(props)
    this.state={
        isLog:false,
        Obj:Home,
        ready:false
    }
  this.handleLog=this.handleLog.bind(this)
  this.LogOut=this.LogOut.bind(this)
  this.choosePage=this.choosePage.bind(this)
  }
  handleLog(){
    this.setState({
      isLog: !this.state.isLog
    })
  }
  LogOut(){
    firebase.auth().signOut().then(function(){
        //done
    }).catch(function(error){
        console.log('log out error')
    })
  }
  choosePage(){
    if(this.state.isLog.displayName==='res'){
      return <ResHome logV={this.state.isLog} logOut={this.LogOut}/>
    }
    if(this.state.isLog.displayName==='ext'){
      return <ExtHome logV={this.state.isLog} logOut={this.LogOut}/>
    }
  }
  
  render() {
    
    //console.log('type')
    return (<div>
              {(this.state.ready)?<div className="App">
                {(!this.state.isLog)?<Home logV={this.state.isLog} logOut={this.LogOut}/>
                :
                this.choosePage()}
              </div>:null}
          </div>
      
    );
  }
  componentDidMount(){
    document.title = "Allo Service";
    new Promise((succ,fail)=>{
      firebase.auth().onAuthStateChanged(firebaseUser =>{
        this.setState({isLog:firebaseUser})
        succ();
        //
        //this.updateObj((firebaseUser)?firebaseUser.displayName:'nope')
      })
    }).then(()=>{this.setState({ready:true})})
    
  }
}

export default App;
/*              <Route path='/' render={()=> (
                this.state.isLog ? (
                  <Redirect to ={'/'+this.state.isLog.displayName}/>
                ):(
                  <Home logV={this.state.isLog} logOut={this.LogOut}/>
                )
              )}/>
              <Route path='/ext' render={()=> <ExtHome logV={this.state.isLog} logOut={this.LogOut}/>}/>
              <Route path='/res' render={()=> <ResHome logV={this.state.isLog} logOut={this.LogOut}/>}/>*/