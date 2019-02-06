function ButtonRes(x,y,scY,mob){
    return (mob)?{
            marginTop:y*0.382/2+'px',
            position:'fixed',
            width:'50%',
            marginLeft: -scY,
            color:'red'
    }:{
            marginTop:y*0.382/2 +'px',
            position:'fixed',
            width:'calc(61.8% / 2)',
            marginLeft: x*0.382/2 -scY,
            color:'red'
    }
}
function ButtonExt(x,y,scY,mob){
    return (mob)?{
        marginTop:y*0.382/2 +'px',
        position:'fixed',
        width:'50%',
        marginLeft: x*0.5+scY+'px',
    }:{
        marginTop:y*0.382/2 +'px',
        position:'fixed',
        width:'calc(61.8% / 2)',
        marginLeft: x*0.5+scY+'px',
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
export{ButtonExt,ButtonLog,ButtonRes};