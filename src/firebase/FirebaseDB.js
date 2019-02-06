import React from 'react';
import firebase from './firebaseInit';

function createRestDB(nom,prenom,cap,addresse,email,nomEnt,uid){
    console.log('heyyyy')
    var ref = firebase.database().ref('Restaurateurs');
    ref.push().set({
            nom:nom,
            prenom:prenom,
            cap:cap,
            addresse:addresse,
            email:email,
            nomEnt:nomEnt,
            uid:uid
    })
    .catch((error)=>{
        console.log(error)
    })
}
function createExtDB(nom,prenom,cap,addresse,email,uid){
    var ref = firebase.database().ref('Extras');
    ref.push().set({
            nom:nom,
            prenom:prenom,
            cap:cap,
            addresse:addresse,
            email:email,
            uid:uid
    })
    .catch((error)=>{
        console.log(error)
    })
}
function getResKeyDB(uid,fun){//find the key of a restaurateur based on their uid
    const ref = firebase.database().ref('Restaurateurs');
    ref.orderByChild('uid').equalTo(uid)
    .once('child_added')
    .then(fun)//do with the key what you need
}
function getExtKeyDB(uid,fun){//find the key of a restaurateur based on their uid
    const ref = firebase.database().ref('Extras');
    ref.orderByChild('uid').equalTo(uid)
    .once('child_added')
    .then(fun)//do with the key what you need
}
function addJob(data,keyEnt,closeDial){//add a new job by a resturant
    var refJ = firebase.database().ref('Jobs');
    var refR = firebase.database().ref('Restaurateurs');
    refJ.push()//push creation of new element
    .then(val=>{
        closeDial();//close creation dialog
        val.set({//add new job
            mission:data.mission,
            cap:data.cap,
            addresse:data.addresse,
            startT:data.startT,
            endT:data.endT,
            keyEnt:keyEnt
        })
        refR.child(keyEnt).child('Jobs').update({//apdate the restaurateurs object with the new value
            [val.key]:'000'
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
    
    .catch((error)=>{
        console.log(error)
    })
    
}
function getJobsRes(keyEnt,fun){//get jobs posted by specific resturant
    var refR = firebase.database().ref('Restaurateurs');//refernces
    var refJ = firebase.database().ref('Jobs');
    refR.child(keyEnt).child('Jobs').on('child_added',snap=>{//using the enterprise key, get the jobs list
        refJ.child(snap.key).once('value')//use each element on the list of jobs to find the info in the DB
        .then(val=>{
            fun(val.val(),val.key)//do what you have to do with what you foundy
        })
    })
}
function getJobs(fun){
    var refJ = firebase.database().ref('Jobs');
    refJ.on('value',snap=>{
        fun(snap.val())
    })
}
function sendCand(ExtKey,JobKey,val){
    
    var refJ = firebase.database().ref('Jobs');
    refJ.child(JobKey).update({
        ['/Candidatures/'+ExtKey]:{
            nom:val.nom,
            prenom:val.prenom,
            cap:val.cap
        },
        seen:false
    })

}
function jobCandSeen(jobKey){
    var refJ = firebase.database().ref('Jobs/'+jobKey);
    refJ.update({
        seen:true
    })
}
function getJobWithKey(jobKey,fun){
    var refJ = firebase.database().ref('Jobs/'+jobKey);
    refJ.on('value',fun)
}
function getExtras(fun){
    var refE = firebase.database().ref('Extras');
    refE.once('value',snap=>{
        fun(snap.val())
    })
}
function contactExtra(keyExt, keyRes,resVal){
    //console.log(keyRes)
    var refE = firebase.database().ref('Extras/'+keyExt);
    refE.update({
        ['Contacts/'+keyRes]:{
            nomEnt:resVal.nomEnt
        },
        seen:false
    })
}
function extNotiSeen(extKey){
    var refE = firebase.database().ref('Extras/'+extKey);
    refE.update({
        seen:true
    })
}
export  {   createRestDB,
            createExtDB,
            getResKeyDB,
            getExtKeyDB,
            addJob,
            getJobsRes,
            getJobs,
            sendCand,
            jobCandSeen,
            getJobWithKey,
            getExtras,
            contactExtra,
            extNotiSeen};
/*
DB structure{
    Restaurateurs:{
        info:..,
        jobs:{
            id:#
        }
    },
    Extras{
        info:..,
        location:..,
        disponibilite:{

        }
    },
    Jobs{
        Restaurateur:..,
        location:..,
        mission:..,
        dateCreation:..,
        status:..
    }
}
*/