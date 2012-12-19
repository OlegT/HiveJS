

var Size = 25;
var SizeX = 19;
var SizeY = 21;
var x0 = Math.sqrt(3)*Size/2;
var y0 = Size;
var idCanvas='canvas'

var CanvasX=650;
var CanvasY=650;

var Player=1;

var Arena=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

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
                  
                  if (md==0){
                     FindXY(point.x,point.y);
                     if (Arena[xt][yt]!=undefined){
                        //alert(Arena[xt][yt]);
                  
                        //hhAr=HexagonFill(xc,yc, Size,'#ffffff');
                        hh=Hexagon(xc,yc, Size);
                        hh.opacity(0.9).color('#ff0000').lineStyle({lineWidth:6});
                        hhAr.push(hh);                     
                        md=1;
                     };

                  }else{
                     for (var i=0;i<hhAr.length;i++){hhAr[i].del();};
                     md=0;


                     //var arr=BoardCells(xt, yt);
                     //var xi;
                     //var yi;
                     //for (var i=0;i<arr.length;i++){
                     //  xi=arr[i][0];
                     //  yi=arr[i][1];
                     //  if ((xi>=0) && (yi>=0)){
                     //     ChangeXY(xi,yi);
                     //     hh=Hexagon(xc,yc, Size);
                     //     hh.opacity(0.2).color('#00ffff').lineStyle({lineWidth:5});
                     //     hhAr.push(hh);
                     //   };
                     //};



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

 
            var colorBoard='#00ffff';
            var BoardWidth=2;
      
      //1 player (White)
            //jc.rect(0,Math.round(CanvasY/2-Size*10),Size*3,Size*20,'#ffffff',1).opacity(1);
            
            //QB
            Arena[0][2]="wQB1"
            ChangeXY(0,2);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgQB1=new Image();
                 imgQB1.src="img/QB.gif";
                 imgQB1.onload=function(){
                    ChangeXY(0,2);
                    jc.image(imgQB1,xc-Size*0.6,yc-Size*0.7,Size*1.2,Size*1.4)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});


            //BE1
            Arena[0][3]="wBE1"
            ChangeXY(0,3);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgBE1=new Image();
                 imgBE1.src="img/BE.gif";
                 imgBE1.onload=function(){
                    ChangeXY(0,3);
                    jc.image(imgBE1,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //BE2
            Arena[0][4]="wBE2"
            ChangeXY(0,4);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgBE2=new Image();
                 imgBE2.src="img/BE.gif";
                 imgBE2.onload=function(){
                    ChangeXY(0,4);
                    jc.image(imgBE2,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //GR1
            Arena[1][4]="wGR1"
            ChangeXY(1,4);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgGR1=new Image();
                 imgGR1.src="img/GR.gif";
                 imgGR1.onload=function(){
                    ChangeXY(1,4);
                    jc.image(imgGR1,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //GR2
            Arena[0][5]="wGR2"
            ChangeXY(0,5);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgGR2=new Image();
                 imgGR2.src="img/GR.gif";
                 imgGR2.onload=function(){
                    ChangeXY(0,5);
                    jc.image(imgGR2,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //GR3
            Arena[0][6]="wGR3"
            ChangeXY(0,6);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgGR3=new Image();
                 imgGR3.src="img/GR.gif";
                 imgGR3.onload=function(){
                    ChangeXY(0,6);
                    jc.image(imgGR3,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  }; 
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //AN1
            Arena[1][6]="wAN1"
            ChangeXY(1,6);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgAN1=new Image();
                 imgAN1.src="img/AN.gif";
                 imgAN1.onload=function(){
                    ChangeXY(1,6);
                    jc.image(imgAN1,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

           //AN2
            Arena[0][7]="wAN2"
            ChangeXY(0,7);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgAN2=new Image();
                 imgAN2.src="img/AN.gif";
                 imgAN2.onload=function(){
                    ChangeXY(0,7);
                    jc.image(imgAN2,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

           //AN3
            Arena[0][8]="wAN3"
            ChangeXY(0,8);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgAN3=new Image();
                 imgAN3.src="img/AN.gif";
                 imgAN3.onload=function(){
                    ChangeXY(0,8);
                    jc.image(imgAN3,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});
 
            //SP1
            Arena[1][8]="wSP1"
            ChangeXY(1,8);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgSP1=new Image();
                 imgSP1.src="img/SP.gif";
                 imgSP1.onload=function(){
                    ChangeXY(1,8);
                    jc.image(imgSP1,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});

            //SP2
            Arena[0][9]="wSP2"
            ChangeXY(0,9);
            HexagonFill(xc,yc, Size,'#ffffff');
             var imgSP2=new Image();
                 imgSP2.src="img/SP.gif";
                 imgSP2.onload=function(){
                    ChangeXY(0,9);
                    jc.image(imgSP2,xc-Size*0.5,yc-Size*0.85,Size,Size*1.7)
                      .draggable()
                      .rotate(30,'center');
                  };             
            Hexagon(xc,yc, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth});



            //2 player (Black)
//            jc.rect(CanvasX-Size*3,Math.round(CanvasY/2-Size*10),Size*3,Size*20,'#000000',1).opacity(1);
 
//            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 
//            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
//            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2-Size*0), Size).color('#00ffff').lineStyle({lineWidth:3}); 
//            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2+Size*4), Size).color('#00ffff').lineStyle({lineWidth:3}); 
//            Hexagon(CanvasX-Size*1.5,Math.round(CanvasY/2+Size*8), Size).color('#00ffff').lineStyle({lineWidth:3}); 









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
  for (var i=1;i<=size-2;i++){
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





