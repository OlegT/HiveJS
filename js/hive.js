

var Size = 25;
var SizeX = 19;//19;
var SizeY = 21;//21;

var sqrt3=Math.sqrt(3);

var x0 = sqrt3*Size/2;
var y0 = Size;
var idCanvas='canvas'

var CanvasX=650;
var CanvasY=650;
var SelectItemColor='#ff0000'; //RED

var colorBoard='#00ffff';
var BoardWidth=1;




var Player=1;

var Arena=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var ArenaObj=[];
var ItemCoord=[];

var SelectItem=0;

var xt=0;
var yt=0;
var xc=0;
var yc=0;

var xt_1, yt_1;

var hh;
var hhAr=[];


var qbiiim;

function Init()
 {
            
            
            jc.start(idCanvas,true);
            //var text=jc.text("",50,50);
           
            
            jc.rect(0,0,CanvasX,CanvasY,'#cdb7b5',1)
              .click(function(point){
              //  this.color('#ff0000');
              //  text.string('x='+point.x+', y='+point.y);
              //  text.up('top');
                  
                  if (SelectItem==0){
                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;

                     if (Arena[xt][yt]!=undefined && Arena[xt][yt]!=''){
                        //alert(Arena[xt][yt]);
                  
                        //hhAr=HexagonFill(xc,yc, Size,'#ffffff');
                        xt_1=xt;
                        yt_1=yt;
                        //ChangeXY(xt,yt);
                        hh=Hexagon(ChangeXY(xt,yt), Size);
                        hh.opacity(0.9).color(SelectItemColor).lineStyle({lineWidth:6});
                        hhAr.push(hh);                     
                        SelectItem=1;
                     };

                  }else{
                     for (var i=0;i<hhAr.length;i++){hhAr[i].del();};
                     SelectItem=0;
                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;
                     MoveItem(Arena[xt_1][yt_1], xt, yt);
                     //if (Arena[xt][yt]==undefined || Arena[xt][yt]==''){
                     //      MoveItem(Arena[xt_1][yt_1], xt, yt);
                     //}else{
                     //   xt_1=xt;
                     //   yt_1=yt;
                     //   //ChangeXY(xt,yt);
                     //   hh=Hexagon(ChangeXY(xt,yt), Size);
                     //   hh.opacity(0.9).color(SelectItemColor).lineStyle({lineWidth:6});
                     //   hhAr.push(hh);                     
                     //  SelectItem=1;



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
             //ChangeXY(i,j);
             hh=Hexagon(ChangeXY(i,j), Size).opacity(0.2);
         }
      }

 

            
      
      InitItems();

      //1 player (White)
      MoveItem("wQB01",0,0);
      MoveItem("wBE02",1,0);
      MoveItem("wBE03",0,1);
      MoveItem("wGR04",2,0);
      MoveItem("wGR05",3,0);
      MoveItem("wGR06",1,1);
      MoveItem("wAN07",2,1);
      MoveItem("wAN08",3,1);
      MoveItem("wAN09",4,0);
      MoveItem("wSP10",5,0);
      MoveItem("wSP11",4,1);

      //2 player (Black)
      MoveItem("bQB21", 7,0);
      MoveItem("bBE22", 8,0);
      MoveItem("bBE23", 7,1);
      MoveItem("bGR24", 9,0);
      MoveItem("bGR25",10,0);
      MoveItem("bGR26", 8,1);
      MoveItem("bAN27", 9,1);
      MoveItem("bAN28",10,1);
      MoveItem("bAN29",11,0);
      MoveItem("bSP30",12,0);
      MoveItem("bSP31",11,1);







 }






function Point(x, y){
    this.x = x || 0;
    this.y = y || 0;
};
Point.prototype.x = null;
Point.prototype.y = null;




function Hexagon(point, size){
        var x0 = point.x;
        var y0 = point.y;
        var x1 = Math.round(point.x - sqrt3*size/2);
        var x2 = Math.round(point.x + sqrt3*size/2);
        var y1 = Math.round(point.y - size);
        var y2 = Math.round(point.y - size/2);
        var y3 = Math.round(point.y + size/2);
        var y4 = Math.round(point.y + size);
        return jc.line([[x1, y2], [x0, y1], [x2, y2], [x2, y3], [x0, y4], [x1, y3], [x1, y2],[x0, y1]]); 
};


function HexagonFill(point, size, colorRGB){
  var Ar=[];
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1));
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1).rotate(-60,'center'));
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1).rotate(+60,'center'));
  return Ar;
};


function HexagonFill_old(point, size, colorRGB){
  var Ar=[];
  for (var i=1;i<=size-2;i++){
    Ar.push(Hexagon(point, i).color(colorRGB).opacity(1).lineStyle({lineWidth:2}));
  };
  return Ar;
};

function FindXY(point){
     xt=Math.round(point.x/(sqrt3*Size)-1);
     yt=Math.round(-1+point.y/(1.5*Size));
     if (xt<0){xt=0;};
     if (yt<0){yt=0;};
     var arr=BoardCells(xt, yt);
     arr.push([xt, yt]);
     //-------
     //  SelectAll(arr);
     //-------
     var d=Size*Size*Size*100;
     var xi,yi,dd, a;
     for (var i=0;i<arr.length;i++){
        xi=arr[i][0];
        yi=arr[i][1];
        if ((xi>=0) && (yi>=0)){
           a=ChangeXY(xi, yi);
           dd=dist(a.x,a.y, point.x,point.y);
           if (dd<d){d=dd;xt=xi;yt=yi};
        };
      };
     return new Point(xt, yt);
};


function dist(x1, y1, x2, y2){
  return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
};

function ChangeXY(i, j){
  yc=y0+ Size*j*1.5;
  if (j % 2 == 0) {
                 xc=x0+i*sqrt3*Size;
             } else {
                 xc=x0+0.5*sqrt3*Size+i*sqrt3*Size;
             }
  return new Point(xc, yc);          
};

function BoardCells(x, y){
  if (y % 2 == 0){
    return [[x-1, y],[x-1, y-1],[x, y-1],[x+1, y],[x, y+1],[x-1, y+1]];
  }else{
    return [[x-1, y],[x, y-1],[x+1, y-1],[x+1, y],[x+1, y+1],[x, y+1]];
  };
};


function TransTo(Objs, dx, dy, lvl){
  for (var i=0;i<Objs.length;i++){
     var point=Objs[i].position();
     Objs[i].translateTo(point.x+dx, point.y+dy);
     Objs[i].level(100+lvl*100+i);
  };
};

function NoItem(ItemStr){
  return parseInt(ItemStr.substring(3,5),10);
};

function MoveItem(ItemStr, x, y){
  //ItemStr="bQB21" , "wQB01"
  // move to cell (x,y)
  ItemStr=ItemStr.substring(0,5);
  var No=NoItem(ItemStr);
  var x1=ItemCoord[No][0];
  var y1=ItemCoord[No][1];
  
  var a=ChangeXY(x1,y1);
  var xc_1=a.x;
  var yc_1=a.y; 

  var a=ChangeXY(x,y);
  var dx=a.x-xc_1;
  var dy=a.y-yc_1;
  
  var lvl;
  if (Arena[x][y]==undefined){
    lvl=0;
  }else{
    lvl=Arena[x][y].length;
  };

  TransTo(ArenaObj[No],dx,dy, lvl);
  
  //Arena[x1][y1]=undefined;
  RemoveString(ItemStr, x1, y1)
  //Arena[x][y]=ItemStr;
  AddString(ItemStr, x, y);
  

  ItemCoord[No]=[x, y];
};

function AddString(ItemStr, x, y){
  var str=Arena[x][y];
  if (str==undefined){
    str="";
  }
  if (str.indexOf(ItemStr)==-1){
    Arena[x][y]=ItemStr+str;
  };
};

function RemoveString(ItemStr, x, y){
  var str=Arena[x][y];
  var n=-1;
  if (str!=undefined){
    n=str.indexOf(ItemStr);
  }
  if (n>-1){
    Arena[x][y]=str.substr(0,n)+str.substr(n+5,str.length);
  };
  if (Arena[x][y]==""){Arena[x][y]=undefined;};
};






function SelectAll(arr){
 var xi,yi;
 for (var i=0;i<arr.length;i++){
        xi=arr[i][0];
        yi=arr[i][1];
        if ((xi>=0) && (yi>=0)){
           a=ChangeXY(xi, yi);
           HexagonFill(a[0], a[1], Size, '#0f0f0f');
        };
      };

};





function InitItems(){
  var xx,yy,No;      
  var img=[];
        //1 player (White)
          
            
            //QB
            xx=0;yy=0;No=1;
            ItemCoord[No]=[xx, yy];
            AddString("wQB"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            
                 img[No] = new Image();
                 img[No].src="img/QB.gif";
                 img[No].onload=function(){
                    No=1;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7,Size*1.2,Size*1.4).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //BE1
            xx=0;yy=0;No=2;
            ItemCoord[No]=[xx, yy];
            AddString("wBE"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/BE.gif";
                 img[No].onload=function(){
                    No=2;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 

            //BE2
            xx=0;yy=0;No=3;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wBE"+"0"+No;
            AddString("wBE"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/BE.gif";
                 img[No].onload=function(){
                    No=3;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 

            //GR1
            xx=0;yy=0;No=4;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wGR"+"0"+No;
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GR.gif";
                 img[No].onload=function(){
                    No=4;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //GR2
            xx=0;yy=0;No=5;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wGR"+"0"+No;
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GR.gif";
                 img[No].onload=function(){
                    No=5;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    var l=ArenaObj[No].length;
                    ArenaObj[No][l-2].up('top');
                  }; 


            //GR3
            xx=0;yy=0;No=6;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wGR"+"0"+No;
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GR.gif";
                 img[No].onload=function(){
                    No=6;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //AN1
            xx=0;yy=0;No=7;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wAN"+"0"+No;
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/AN.gif";
                 img[No].onload=function(){
                    No=7;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


           //AN2
            xx=0;yy=0;No=8;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wAN"+"0"+No;
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/AN.gif";
                 img[No].onload=function(){
                    No=8;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


           //AN3
            xx=0;yy=0;No=9;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wAN"+"0"+No;
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/AN.gif";
                 img[No].onload=function(){
                    No=9;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //SP1
            xx=0;yy=0;No=10;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wSP"+No;
            AddString("wSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/SP.gif";
                 img[No].onload=function(){
                    No=10;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //SP2
            xx=0;yy=0;No=11;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wSP"+No;
            AddString("wSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#ffffff');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/SP.gif";
                 img[No].onload=function(){
                    No=11;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 




            //2 player (Black)

            //QB
            xx=0;yy=0;No=21;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bQB"+No;
            AddString("bQB"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/QBb.gif";
                 img[No].onload=function(){
                    No=21;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7,Size*1.2,Size*1.4).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 

            //BE1
            xx=0;yy=0;No=22;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bBE"+No;
            AddString("bBE"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/BEb.gif";
                 img[No].onload=function(){
                    No=22;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 

            //BE2
            xx=0;yy=0;No=23;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bBE"+No;
            AddString("bBE"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/BEb.gif";
                 img[No].onload=function(){
                    No=23;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 

            //GR1
            xx=0;yy=0;No=24;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bGR"+No;
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GRb.gif";
                 img[No].onload=function(){
                    No=24;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //GR2
            xx=0;yy=0;No=25;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bGR"+No;
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GRb.gif";
                 img[No].onload=function(){
                    No=25;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //GR3
            xx=0;yy=0;No=26;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bGR"+No;
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/GRb.gif";
                 img[No].onload=function(){
                    No=26;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //AN1
            xx=0;yy=0;No=27;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bAN"+No;
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/ANb.gif";
                 img[No].onload=function(){
                    No=27;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


           //AN2
            xx=0;yy=0;No=28;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bAN"+No;
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/ANb.gif";
                 img[No].onload=function(){
                    No=28;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //AN3
            xx=0;yy=0;No=29;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="bAN"+No;
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/ANb.gif";
                 img[No].onload=function(){
                    No=29;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 
 

            //SP1
            xx=0;yy=0;No=30;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wSP"+No;
            AddString("bSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/SPb.gif";
                 img[No].onload=function(){
                    No=30;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


            //SP2
            xx=0;yy=1;No=31;
            ItemCoord[No]=[xx, yy];
            //Arena[xx][yy]="wSP"+No;
            AddString("bSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,'#000000');
            //ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));
                 img[No] = new Image();
                 img[No].src="img/SPb.gif";
                 img[No].onload=function(){
                    No=31;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center'));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 


};


