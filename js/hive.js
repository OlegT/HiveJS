

var Size = 20;
var SizeX = 19;
var SizeY = 22;
var x0 = Math.sqrt(3)*Size/2;
var y0 = Size;
var idCanvas='canvas'

var CanvasX=650;
var CanvasY=650;


var md=0;

var xt=0;
var yt=0;
var xc=0;
var yc=0;

var hh;
var hhAr=[];

function Init()
 {
            
            
            jc.start(idCanvas,true);
            //var text=jc.text("",50,50);
           
            
            jc.rect(0,0,CanvasX,CanvasY,'#cdb7b5',1)
              .click(function(point){
              //  this.color('#ff0000');
              //  text.string('x='+point.x+', y='+point.y);
              //  text.up('top');
                  
                  if (md==1){
                     for (var i=0;i<hhAr.length;i++){hhAr[i].del();};
                  };
                  FindXY(point.x,point.y);
                  ChangeXY(xt,yt);
                  
                  hhAr=HexagonFill(xc,yc, Size,'#ffffff');
                  hh=Hexagon(xc,yc, Size);
                  hh.opacity(0.9).color('#ff0000').lineStyle({lineWidth:6});
                  md=1;
                  hhAr.push(hh);

                  
 
                  var arr=BoardCells(xt, yt);
                  var xi;
                  var yi;
                  for (var i=0;i<arr.length;i++){
                    xi=arr[i][0];
                    yi=arr[i][1];
                    if ((xi>=0) && (yi>=0)){
                       ChangeXY(xi,yi);
                       hh=Hexagon(xc,yc, Size);
                       hh.opacity(0.2).color('#00ffff').lineStyle({lineWidth:5});
                       hhAr.push(hh);
                    };
                  };


                })
              .mousedown(function(point){
                //md=1;
                //hh=Hexagon(point.x,point.y, Size);
                })
              .mouseup(function(point){
                //md=0;
                //hh.del();
                })
              .mousemove(function(point){
                //hh.del();
                //hh=Hexagon(point.x,point.y, Size);
                });



     for (var i = 0; i < SizeX; i++) {
         for (var j = 0; j < SizeY; j++) {
             ChangeXY(i,j);
             hh=Hexagon(xc,yc, Size).opacity(0.2);
         }
      }

 
//1 player (White)
            jc.rect(0,Math.round(CanvasY/2-Size*10),Size*3,Size*20,'#ffffff',1).opacity(1);

            //QB
            Hexagon(Size*1.5,Math.round(CanvasY/2-Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 
             var imgQB=new Image();
                 imgQB.src="img/QB.gif";
                 imgQB.onload=function(){
                    jc.image(imgQB,Size*1.5-Size*0.6,Math.round(CanvasY/2-Size*8)-Size*0.7,Size*1.2,Size*1.4)
                      .draggable()
                      .rotate(30,'center');
                  }; 

            //BE
            Hexagon(Size*1.5,Math.round(CanvasY/2-Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
             var imgBE=new Image();
                 imgBE.src="img/BE.gif";
                 imgBE.onload=function(){
                    jc.image(imgBE,Size*1.5-Size*0.5,Math.round(CanvasY/2-Size*4)-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 

            //GR
            Hexagon(Size*1.5,Math.round(CanvasY/2-Size*0), Size).color('#00ffff').lineStyle({lineWidth:3}); 
             var imgGR=new Image();
                 imgGR.src="img/GR.gif";
                 imgGR.onload=function(){
                    jc.image(imgGR,Size*1.5-Size*0.5,Math.round(CanvasY/2-Size*0)-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 



            //AN
            Hexagon(Size*1.5,Math.round(CanvasY/2+Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
             var imgAN=new Image();
                 imgAN.src="img/AN.gif";
                 imgAN.onload=function(){
                    jc.image(imgAN,Size*1.5-Size*0.5,Math.round(CanvasY/2+Size*4)-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             


            //SP
            Hexagon(Size*1.5,Math.round(CanvasY/2+Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 
             var imgSP=new Image();
                 imgSP.src="img/SP.gif";
                 imgSP.onload=function(){
                    jc.image(imgSP,Size*1.5-Size*0.5,Math.round(CanvasY/2+Size*8)-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             




            //2 player (Black)
            jc.rect(CanvasX-Size*3,Math.round(CanvasY/2-Size*10),Size*3,Size*20,'#000000',1).opacity(1);
 
            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 
            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*0), Size).color('#00ffff').lineStyle({lineWidth:3}); 
            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2+Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2+Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 









                 //jc('.QB')
                 //  

             //jc.start('canvas',true);
            //we can create another object and use some function
            //(see more in 'functions')
            //jc.rect(150,40,50,60,1)
             //   .rotate(30,'center');





     

     
     
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
        return jc.line([[x1, y2], [x0, y1], [x2, y2], [x2, y3], [x0, y4], [x1, y3], [x1, y2],[x0, y1]]); 
};

function HexagonFill(x0, y0, size, colorRGB){
  var Ar=[];
  for (var i=1;i<=size-1;i++){
    Ar.push(Hexagon(x0, y0, i).color(colorRGB).opacity(1).lineStyle({lineWidth:2}));
  };
  return Ar;
};


function FindXY(x, y){
     xt=Math.round(x/(Math.sqrt(3)*Size)-1);
     yt=Math.round(-1+y/(1.5*Size));
     if (xt<0){xt=0;};
     if (yt<0){yt=0;};
     var arr=BoardCells(xt, yt);
     arr.push([xt,yt]);
     var d=Size*Size*Size*100;
     var xi,yi,dd;
     for (var i=0;i<arr.length;i++){
        xi=arr[i][0];
        yi=arr[i][1];
        if ((xi>=0) && (yi>=0)){
           ChangeXY(xi, yi);
           dd=dist(xc,yc, x,y);
           if (dd<d){d=dd;xt=xi;yt=yi};
        };
      };
 
};

function dist(x1, y1, x2, y2){
  return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
};

function ChangeXY(i, j){
  yc=y0+ Size*j*1.5;
  if (j % 2 == 0) {
                 xc=x0+i*Math.sqrt(3)*Size;
             } else {
                 xc=x0+0.5*Math.sqrt(3)*Size+i*Math.sqrt(3)*Size;
             }
};

function BoardCells(x, y){
  if (y % 2 == 0){
    return [[x-1, y],[x-1, y-1],[x, y-1],[x+1, y],[x, y+1],[x-1, y+1]];
  }else{
    return [[x-1, y],[x, y-1],[x+1, y-1],[x+1, y],[x+1, y+1],[x, y+1]];
  };
};





