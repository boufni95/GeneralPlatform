function JobViewBg(x,y,mob){
    return (mob)?{
        position:'fixed',
        height:y*0.618,
        width:x,
        background: 'linear-gradient(to bottom, rgba(247,251,252,1) 0%,rgba(217,237,242,1) 41%,rgba(173,217,228,1) 100%)',
        marginTop:y*0.382+'px',
        overflowX:'scroll'
    }:{
        position:'fixed',
        height:y*0.618,
        width:x,
        background: 'linear-gradient(to bottom, rgba(247,251,252,1) 0%,rgba(217,237,242,1) 41%,rgba(173,217,228,1) 100%)',
        marginTop:y*0.382+'px'
    }
}
function SingleJobBg(x,y,scy,mob,index){
        
        return (mob)?{
                position:'fixed',
                height:y*0.618*0.618,
                width:x*0.618,
                backgroundColor:'white',
                //background: 'linear-gradient(to bottom, rgba(247,251,252,1) 0%,rgba(217,237,242,1) 41%,rgba(173,217,228,1) 100%)',
                marginTop:y*0.118+'px',
                marginLeft:x*0.382/2+x*0.714*index-scy+'px'

            }:{
                position:'fixed',
                height:y*0.618*0.618,
                width:x*0.382,
                backgroundColor:'white',
                //background: 'linear-gradient(to bottom, rgba(247,251,252,1) 0%,rgba(217,237,242,1) 41%,rgba(173,217,228,1) 100%)',
                marginTop:y*0.118+'px',
                marginLeft:x*0.618/2+x*0.537*index-scy+'px'
            }
}
function ButtonNot(x,mob){
    return (mob)?{
        position:'absolute',
        height:'48px',
        width:'48px',
        marginLeft:'calc(100% - 48px)'
    }:{
        position:'absolute',
        height:'48px',
        width:'48px',
        marginLeft:'calc(100% - 48px)'
    }
}
export{JobViewBg,SingleJobBg,ButtonNot};