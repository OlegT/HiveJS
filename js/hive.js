

var Size = 24;
var SizeX = 19;//19;
var SizeY = 21;//21;

var sqrt3=Math.sqrt(3);

var x0 = sqrt3*Size/2;
var y0 = Size;
var idCanvas='canvas'

var CanvasX=650;
var CanvasY=650;
var SelectItemColor='#ffcc00'; // #66ccff color select item http://www.web-palette.ru/sub/useful/cozdaem/vozvopros/mf

var colorBoard='#cc9900'; // color of board cell
var BoardWidth=1.5;

var WhiteItem='#ffffff';
var BlackItem='#000000';

var lvl_x=Size/12;
var lvl_y=-Size/6;





var Player=1;
var NoMove=1;


var Arena=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var ArenaObj=[];
var ItemCoord=[];
var AvCells=[];
var SelectItem=0;

var xt=0;
var yt=0;
var xc=0;
var yc=0;
var as='';

var xt_1, yt_1;

var hh;
var hhAr=[];


//var qbiiim;

function Init()
 {
            
            
            jc.start(idCanvas,true);
            //var text=jc.text("",50,50);
           
            
            jc.rect(0,0,CanvasX,CanvasY,'#f7dcb4',1)  //#a97d5d #cdb7b5 F7DCB4
              .mousedown(function(point){
              //  this.color('#ff0000');
              //  text.string('x='+point.x+', y='+point.y);
              //  text.up('top');
                  
                  if (SelectItem==0){
                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;
                     
                     if (Arena[xt][yt]!=undefined && Arena[xt][yt]!=''){

                        if (SameColor(NoMove,Arena[xt][yt])){
                        
                          as=Arena[xt][yt];
                          xt_1=xt;
                          yt_1=yt;
                          hhAr.push(Sel_Item(xt, yt));
                       
                          SelectItem=1;
                          AvCells=AvailableCells(as, xt, yt); 
                          SelectAll(AvCells);
                        };
                     };

                  }else{
                     for (var i=0;i<hhAr.length;i++){hhAr[i].del();};
                     SelectItem=0;
                     
                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;
                     
                     if ( inArray([xt,yt], AvCells) >-1){
                       MoveItem(Arena[xt_1][yt_1], xt, yt);

                       if (Arena[xt_1][yt_1]!=as){
                          NextMove();
                       };
                     };

                  };

                })
              .click(function(point){
                
                })
              .mouseup(function(point){
                
                })
              .mousemove(function(point){
                
                });








     for (var i = -1; i < SizeX; i++) {
         for (var j = 3; j < SizeY; j++) {
             hh=Hexagon(ChangeXY(i,j), Size).opacity(0.2).level(50).color('#9c9f84');
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


function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function inArray(elem,array)
{
var len = array.length;
for(var i = 0 ; i < len;i++)
{
    if(arraysEqual(array[i], elem)){return i;}
}
return -1;
} 


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


function HexagonFill(point, size, colorRGB, lvl){
  var Ar=[];
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1).level(lvl));
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1).rotate(-60,'center').level(lvl+1));
  Ar.push(jc.rect(point.x-sqrt3*size/2,point.y-size/2,sqrt3*size,size,colorRGB,1).rotate(+60,'center').level(lvl+2));
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


function LevelNo(ItemStr){
  var lvl=0;
  if (ItemStr==undefined){
    lvl=0;
  }else{  
    lvl=Math.ceil(ItemStr.length/5);
  };
  return lvl;
};


function LevelItem(ItemStr){
  return 100+LevelNo(ItemStr)*100;
};

function Sel_Item(x, y){
  var pt=ChangeXY(xt,yt);
  var lvl=LevelNo(Arena[x][y])-1;
  pt.x=pt.x+lvl*lvl_x;
  pt.y=pt.y+lvl*lvl_y;
  var hh=Hexagon(pt, Size);
  hh.opacity(0.7).color(SelectItemColor).lineStyle({lineWidth:6});
  return hh;                     
};


function TransTo(Objs, dx, dy, lvl){
  for (var i=0;i<Objs.length;i++){
     var point=Objs[i].position();
     Objs[i].translateTo(point.x+dx, point.y+dy);
     Objs[i].level(lvl+i);
  };
};


function NoItem(ItemStr){
  return parseInt(ItemStr.substring(3,5),10);
};


function MoveItem(ItemStr, x, y){
  //ItemStr="bQB21" , "wQB01"
  // move to cell (x,y)
  var lvl=LevelNo(ItemStr)-1;
  ItemStr=ItemStr.substring(0,5);
  var No=NoItem(ItemStr);
  var x1=ItemCoord[No][0];
  var y1=ItemCoord[No][1];
  
  var a=ChangeXY(x1,y1);
  var xc_1=a.x+lvl*lvl_x;
  var yc_1=a.y+lvl*lvl_y; 
  
  RemoveString(ItemStr, x1, y1)
  
  lvl=LevelNo(Arena[x][y]);
  var a=ChangeXY(x,y);
  var dx=a.x-xc_1+lvl*lvl_x;
  var dy=a.y-yc_1+lvl*lvl_y;
  
  var lvl=LevelItem(Arena[x][y]);
  
  TransTo(ArenaObj[No],dx,dy,lvl);
  
  //Arena[x1][y1]=undefined;

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







function NextMove(){
  NoMove++;

  if (NoMove%2==0){
    $('#ColorItem').text("Black");
  }else{
    $('#ColorItem').text("White");
  };

};


function SameColor(NoMove, ItemStr){

  if ((NoMove%2==0 && ItemStr.substr(0,1)=='b') || (NoMove%2==1 && ItemStr.substr(0,1)=='w')){
    return true;
  }else{
    return false;
  };
};


function SelectAll(arr){
 var xi,yi;
 for (var i=0;i<arr.length;i++){
        xi=arr[i][0];
        yi=arr[i][1];
        if ((xi>=0) && (yi>=0)){
           HexagonFill(ChangeXY(xi, yi), Size, '#f1010f', 50);
        };
      };

};


function AvailableCells(ItemStr, x, y){
  return BoardCells(x, y);
}; 


function InitItems(){
  var xx,yy,No,lvl;      
  var img=[];
        //1 player (White)
          
            
            //QB
            xx=2;yy=2;No=1;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wQB"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=1;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7, Size*1.2,Size*1.4).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/QB.gif";


            //BE1
            xx=2;yy=2;No=2;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wBE"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=2;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 
                  img[No].src="img/BE.gif";


            //BE2
            xx=2;yy=2;No=3;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wBE"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=3;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                    //var l=ArenaObj[No].length;
                    //ArenaObj[No][l-2].up('top');
                  }; 
                 img[No].src="img/BE.gif";


            //GR1
            xx=2;yy=2;No=4;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=4;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/GR.gif";


            //GR2
            xx=2;yy=2;No=5;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=5;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));
                  }; 
                 img[No].src="img/GR.gif";


            //GR3
            xx=2;yy=2;No=6;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wGR"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=6;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/GR.gif";


            //AN1
            xx=2;yy=2;No=7;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=7;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/AN.gif";


           //AN2
            xx=2;yy=2;No=8;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=8;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/AN.gif";


           //AN3
            xx=2;yy=2;No=9;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wAN"+"0"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=9;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/AN.gif";


            //SP1
            xx=2;yy=2;No=10;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=10;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/SP.gif";


            //SP2
            xx=2;yy=2;No=11;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("wSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,WhiteItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=11;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/SP.gif";




            //2 player (Black)
             
            //QB
            xx=2;yy=2;No=21;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bQB"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=21;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7,Size*1.2,Size*1.4).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/QBb.gif";


            //BE1
            xx=2;yy=2;No=22;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bBE"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=22;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/BEb.gif";


            //BE2
            xx=2;yy=2;No=23;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bBE"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=23;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/BEb.gif";


            //GR1
            xx=2;yy=2;No=24;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=24;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/GRb.gif";


            //GR2
            xx=2;yy=2;No=25;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=25;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/GRb.gif";


            //GR3
            xx=2;yy=2;No=26;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bGR"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=26;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/GRb.gif";


            //AN1
            xx=2;yy=2;No=27;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=27;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/ANb.gif";


           //AN2
            xx=2;yy=2;No=28;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=28;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/ANb.gif";


            //AN3
            xx=2;yy=2;No=29;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bAN"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=29;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/ANb.gif";
 

            //SP1
            xx=2;yy=2;No=30;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=30;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/SPb.gif";


            //SP2
            xx=2;yy=2;No=31;
            ItemCoord[No]=[xx, yy];
            lvl=LevelItem(Arena[xx][yy]);
            AddString("bSP"+No, xx, yy);
            ArenaObj[No] =HexagonFill(ChangeXY(xx,yy), Size,BlackItem,lvl);
                 img[No] = new Image();
                 img[No].onload=function(){
                    No=31;
                    xx=ItemCoord[No][0];
                    yy=ItemCoord[No][1];
                    var a=ChangeXY(xx,yy);
                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(ChangeXY(xx,yy), Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/SPb.gif";


};


