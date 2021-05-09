var canvas = document.getElementById('myCanvas');
var score_p=document.getElementById('score_p')
var rect_canvas = canvas.getBoundingClientRect();
var Score=0;
var MAX_Score=0;
canvas.addEventListener('click', function(event) {
    var xVal = event.pageX-rect_canvas.left ,yVal = event.pageY-rect_canvas.top ;
    //console.log(xVal, yVal);   
    if(pferde.length>0){
        //ctx.fillStyle='rgb(151,64,64)';
        var x=Math.floor(xVal/100);
        var y=Math.floor(yVal/100);
        if(inPferdeMoves(x,y)){
            //console.log(x+" "+y);
            if(!inPferde(x,y)){
                if(y%2==0){
                    if(x%2==0){
                        ctx.fillStyle='rgb(155,96,96)';
                    }else{
                        ctx.fillStyle='rgb(151,64,64)';
                    }
                }else{
                    if(x%2==1){
                        ctx.fillStyle='rgb(155,96,96)';
                    }else{
                        ctx.fillStyle='rgb(151,64,64)';
                    }
                }
                ctx.fillRect(x*100,y*100,100,100);
            }else{
                ctx.beginPath();
                ctx.arc(x*100+50,y*100+50, 45, 0, 2 * Math.PI);
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#003300';
                ctx.stroke(); 
            }
            score_p.textContent=Score+" / "+MAX_Score;
            if(Score>=MAX_Score){
                setTimeout(()=>{alert("You WIN! "+Score+" / "+MAX_Score);
                location.reload();},1000); 
            }
        }
    }
},false);

var img_PferdW=new Image();
img_PferdW.src="./Figuren/PferdW.png"

var pferde=new Array();
var pferdeMoves=new Array();

function inPferdeMoves(x,y){
    ret=false;
    for(var i=0;i<pferdeMoves.length;i++){
        if(pferdeMoves[i][0]==x && pferdeMoves[i][1]==y){
            pferdeMoves.splice(i,1);
            i--;
            ret=true;
            Score++;
        }
    }
    return ret;
}

function inPferde(x,y){
    for(var i=0;i<pferde.length;i++){
        if(pferde[i][0]==x && pferde[i][1]==y)
            return true;
    }
    return false;
}

var ctx = canvas.getContext('2d');
for(var i=0;i<4;i++){
    for(var j=0;j<8;j++){
        if(j%2==0)
            ctx.fillStyle='rgb(236,238,212)';
        else
            ctx.fillStyle='rgb(116,150,84)';
        ctx.fillRect(i*200,j*100,100,100);
        if(j%2==0)
            ctx.fillStyle='rgb(116,150,84)';
        else
            ctx.fillStyle='rgb(236,238,212)';
        ctx.fillRect(i*200+100,j*100,100,100);
    }
}
/*var img_Bauer = new Image();
img_Bauer.src = "./Figuren/Bauer.png";*/
/*img_Bauer.onload=function(){
    ctx.drawImage(img_Bauer,100,600);
    ctx.drawImage(img_Bauer,200,600);
}*/
img_PferdW.onload=function(){
    do{
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++){
                if(Math.floor(Math.random()*64)<5){
                    pferde.push([i,j]);
                    ctx.drawImage(img_PferdW,i*100,j*100);
                }
            }
        }
    }while(pferde.length<=0);
    //console.log(pferde);
    //console.log(pferde.length);
    for(var i=0;i<pferde.length;i++){
        var x=pferde[i][0],y=pferde[i][1];
        pferdeMoves.push([x+2,y+1]);
        pferdeMoves.push([x+2,y-1]);
        pferdeMoves.push([x-2,y+1]);
        pferdeMoves.push([x-2,y-1]);
        pferdeMoves.push([x+1,y+2]);
        pferdeMoves.push([x-1,y+2]);
        pferdeMoves.push([x+1,y-2]);
        pferdeMoves.push([x-1,y-2]);
    }
    console.log(pferdeMoves.length);
    for(var i=0;i<pferdeMoves.length;i++){
        var x=pferdeMoves[i][0],y=pferdeMoves[i][1];
        if(x<0 || y<0 || x>7|| y>7){
            pferdeMoves.splice(i,1);
            i--;
        }
    }
    //console.log(pferdeMoves);
    //console.log(pferdeMoves.length);
    MAX_Score=pferdeMoves.length;
}


