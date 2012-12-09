

var Size = 40;
var SizeX = 25;
var SizeY = 25;
var x0 = Math.sqrt(3)*Size/2;
var y0 = Size;
var idCanvas='canvas'



var md=0;

var xt=0;
var yt=0;
var xc=0;
var yc=0;

var hh;

function Init()
 {
            
            
            jc.start(idCanvas,true);
            //var text=jc.text("",50,50);
           
            //jc.circle(100,100,50,'rgba(255,0,0,0.5)',1);
            jc.rect(0,0,500,500,'#cdb7b5',1)
              .click(function(point){
              //  this.color('#ff0000');
              //  text.string('x='+point.x+', y='+point.y);
              //  text.up('top');
                  //hh.del();
                  FindXY(point.x,point.y);
                  ChangeXY(xt,yt);
                  hh=Hexagon(xc,yc, Size+1);

                })
              .mousedown(function(point){
                md=1;
                //hh=Hexagon(point.x,point.y, Size);
                })
              .mouseup(function(point){
                md=0;
                //hh.del();
                })
              .mousemove(function(point){
                
                           //hh.del();
                           //hh=Hexagon(point.x,point.y, Size);
                      
                });
            //QB
             var imgQB=new Image();
                 imgQB.src="img/QB.gif";

                 imgQB.onload=function(){
                    jc.start('canvas',true);
                    jc.image(imgQB,Size/5,Size,Size*1.2,Size*1.4)
                      .draggable()
                      .rotate(30,'center');
                  }; 

            //GR
             var imgGR=new Image();
                 imgGR.src="img/GR.gif";

                 imgGR.onload=function(){
                    jc.start('canvas',true);
                    jc.image(imgGR,Size/5,2*Size,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 

            //AN
             var imgAN=new Image();
                 imgAN.src="img/AN.gif";

                 imgAN.onload=function(){
                    jc.start('canvas',true);
                    jc.image(imgAN,Size/5,3*Size,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             





                 //jc('.QB')
                 //  

             //jc.start('canvas',true);
            //we can create another object and use some function
            //(see more in 'functions')
            //jc.rect(150,40,50,60,1)
             //   .rotate(30,'center');



     for (var i = 0; i < SizeX; i++) {
         for (var j = 0; j < SizeY; j++) {
             if (j % 2 == 0) {
                 Hexagon(x0+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, Size);
             } else {
                 Hexagon(x0+0.5*Math.sqrt(3)*Size+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, Size);
             }
         }
      }

     

     
     
     //jc('canvas').click(function(){
     //           alert("eeeeeeee");
     //       });
 }

function Hexagon(x0, y0, size){
        var x1 = Math.round(x0 - Math.sqrt(3)*size/2);
        var x2 = Math.round(x0 + Math.sqrt(3)*size/2);
        var y1 = Math.round(y0 - size);
        var y2 = Math.round(y0 - size/2);
        var y3 = Math.round(y0 + size/2);
        var y4 = Math.round(y0 + size);
        return jc.line([[x1, y2], [x0, y1], [x2, y2], [x2, y3], [x0, y4], [x1, y3], [x1, y2]]); 
};
function FindXY(x, y){
     xt=0;
     yt=0;
     var d=Size*Size*Size*100;

     for (var i = 0; i < SizeX; i++) {
         for (var j = 0; j < SizeY; j++) {
             if (j % 2 == 0) {
                 if (dist(x0+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, x,y)<d){d=dist(x0+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, x,y);xt=i;yt=j};
             } else {
                 if (dist(x0+0.5*Math.sqrt(3)*Size+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, x,y)<d){d=dist(x0+0.5*Math.sqrt(3)*Size+i*Math.sqrt(3)*Size,y0+ Size*j*1.5, x,y);xt=i;yt=j};
             }
         }
      }
};
function dist(x1, y1, x2, y2){
  return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
};
function ChangeXY(i,j){
  yc=y0+ Size*j*1.5;
  if (j % 2 == 0) {
                 xc=x0+i*Math.sqrt(3)*Size;
             } else {
                 xc=x0+0.5*Math.sqrt(3)*Size+i*Math.sqrt(3)*Size;
             }
};