import React from 'react';
import firebase from './firebaseInit';
import {createRestDB,
        createExtDB} from './FirebaseDB';

function FireLogIn(email,pass,success,fail){
    firebase.auth().signInWithEmailAndPassword(email,pass)
    .then((userCre)=>{
        console.log('success')
        console.log(userCre.user.uid)
        success()
    })
    .catch((error)=>{
        console.log(error);
        fail('firebase error');
    });
}
function FireSignInRes(nomEnt,nom,prenom,cap,addresse,email,pass,success,fail){
    firebase.auth().createUserWithEmailAndPassword(email,pass)
    .then((userCre)=>{
        userCre.user.updateProfile({
            displayName:'res'
        })
        .then(()=>{
            console.log('success update')
        })
        .catch(()=>{
            console.log('error update user')
        })
        createRestDB(nom,prenom,cap,addresse,email,nomEnt,userCre.user.uid);
        console.log('success')
        success()
        window.location.reload(false);
    })
    .catch((error)=>{
        console.log(error);
        fail();
    })
}
function FireSignInExt(nom,prenom,cap,addresse,email,pass,success,fail){
    firebase.auth().createUserWithEmailAndPassword(email,pass)
    .then((userCre)=>{
        userCre.user.updateProfile({
            displayName:'ext'
        })
        .then(()=>{
            console.log('success update')
        })
        .catch(()=>{
            console.log('error update user')
        })
        createExtDB(nom,prenom,cap,addresse,email,userCre.user.uid);
        console.log('success')
        success()
        window.location.reload(false);
    })
    .catch((error)=>{
        console.log(error);
        fail();
    })
}
export {FireLogIn,FireSignInExt,FireSignInRes};
