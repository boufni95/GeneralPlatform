function ButtonPost(x,y,scY,mob){
    return (mob)?{
            marginTop:y*0.382/2 +'px',
            position:'fixed',
            width:'50%',
            color:'red'
    }:{
            marginTop:y*0.382/2 +'px',
            position:'fixed',
            width:'calc(61.8% / 2)',
            marginLeft: x*0.382/2,
            color:'red'
    }
}
function ButtonFind(x,y,scY,mob){
    return (mob)?{
        marginTop:y*0.382/2 +'px',
        position:'fixed',
        width:'50%',
        marginLeft: x*0.5+'px',
    }:{
        marginTop:y*0.382/2 +'px',
        position:'fixed',
        width:'calc(61.8% / 2)',
        marginLeft: x*0.5+'px',
    }
}
function ButtonLog(x,mob){
    return (mob)?{
            position:'fixed',
            width:'100%',
    }:{
            position:'fixed',
            width:'calc(38.2% / 4)',
            marginLeft: '45.2%',
    }
}
function ButtNotExt(x,mob){
    return (mob)?{
        position:'fixed',
        height:'48px',
        width:'48px',
        marginLeft:'calc(100% - 48px)',
        zIndex:2
    }:{
        position:'fixed',
        height:'48px',
        width:'48px',
        marginLeft:'calc(90.45% - 48px)'
    }
}


export{ButtonPost,ButtonLog,ButtonFind,ButtNotExt};