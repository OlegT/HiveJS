

var Size = 24;
var SizeX = 19;//19;
var SizeY = 21;//21;

var sqrt3=Math.sqrt(3);

var x0 = Size/2+sqrt3*Size/2-Size*16;
var y0 = Size*1.5-Size*10;
var idCanvas='canvas'

var CanvasX=650;
var CanvasY=650;
var SelectItemColor='#ffcc00'; // #66ccff color select item http://www.web-palette.ru/sub/useful/cozdaem/vozvopros/mf
var SelectAvailItem='#66ccff';

var colorBoard='#cc9900'; // color of board cell
var BoardWidth=1.5;

var WhiteItem='#ffffff';
var BlackItem='#000000';

var lvl_x=Size/12;
var lvl_y=-Size/6;

var startx=15;
var starty=15;



var PlayerWin;
var NoMove=1;


var Arena=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var ArenaObj=[];
var ItemCoord=[];
var AvCells=[];
var SelectItem=0;
var GameStop=false;

var xt=0;
var yt=0;
var xc=0;
var yc=0;
var as='';

var xt_1, yt_1;

var hh;


var mouseClick=false;
var x_old;
var y_old;


var ABC=[];
var ABCtemp=[];
var hhAr=[];
var hhAv=[];
var img=[];

//var qbiiim;
// $(function() {
//   jc.start(idCanvas,true);
//   //InitItems();
//   Init();
   
// })


function Init()
 {
            
            
            jc.start(idCanvas,true);
            var text=jc.text("",50,100);
           
            
            jc.rect(0,0,CanvasX,CanvasY,'#f7dcb4',1).level(10)  //#a97d5d #cdb7b5 F7DCB4
              .mousedown(function(point){
              //  this.color('#ff0000');
                // text.string('x='+point.x+', y='+point.y);
                // text.up('top');
                
                mouseClick=true;
                x_old=point.x;
                y_old=point.y;

                if (!GameStop){
                  if (SelectItem==0){

                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;
                     
                     if (!Empt(xt,yt)){

                        if (SameColor(NoMove,Arena[xt][yt])){
                        
                          as=Arena[xt][yt];
                          xt_1=xt;
                          yt_1=yt;
                          hhAr.push(Sel_Item(xt, yt, SelectItemColor));
                       
                          SelectItem=1;
                          AvCells=[];
                          if (yt<1){
                            AvCells=AvailableCells(as, xt, yt); 
                          }else{
                            if ((NoMove%2==1 && ItemCoord[01][1]>0) || (NoMove%2==0 && ItemCoord[21][1]>0)){
                              AvCells=AvailableMoves(as, xt, yt); 
                            };
                          };

                          hhAv=SelectAvail(AvCells);

                          hhAr[0].level(50000);

                          // No variants
                          if (hhAv.length==0) {
                            for (var i=0;i<hhAr.length;i++){hhAr[i].del();}; hhAr=[];
                            for (var i=0;i<hhAv.length;i++){hhAv[i].del();}; hhAv=[];
                            SelectItem=0;
                          };

                          mouseClick=false;

                        };
                     };

                  }else{
                     
                     for (var i=0;i<hhAr.length;i++){hhAr[i].del();}; hhAr=[];
                     for (var i=0;i<hhAv.length;i++){hhAv[i].del();}; hhAv=[];
                     SelectItem=0;
                     
                     var SelHex=FindXY(point);
                     xt=SelHex.x;
                     yt=SelHex.y;
                     
                     if ( inArray([xt,yt], AvCells) >-1){
                       MoveItem(Arena[xt_1][yt_1], xt, yt);

                       if (Arena[xt_1][yt_1]!=as){
                          if (CheckWin()) {
                            GameStop=true;
                          };
                          NextMove();
                       };

                       mouseClick=false;

                     };

                  };

                };

                })
              .click(function(point){
                
                })
              .mouseup(function(point){
                mouseClick=false;
                if (GameStop){
                  if (PlayerWin==1){
                    alert('White win');
                  }else{
                    alert('Black win');
                  };
                };
                })
              .mousemove(function(point){
                if (mouseClick) {
                    
                    var dx=point.x-x_old;
                    var dy=point.y-y_old;

                    // text.string('dx='+dx+', dy='+dy);
                    // text.up('top');

                    for(var i=1; i<35;i++){
                      if (ArenaObj[i]!=undefined){
                        if (ItemCoord[i][1]>0){
                          TransTo1(ArenaObj[i],dx,dy);
                        };
                      };
                    };
                    
                    
                    x0=x0+dx;
                    y0=y0+dy; 

                    x_old=point.x;
                    y_old=point.y;

                }

                });








     // for (var i = -1; i < SizeX; i++) {
     //     for (var j = 3; j < SizeY; j++) {
     //         hh=Hexagon(ChangeXY(i,j), Size).opacity(0.2).level(50).color('#9c9f84');
     //     }
     //  }

 
      jc.rect(0,0,CanvasX,Size*3,'#a97d5d',1).level(2000);
            
      
      InitItems();

      //1 player (White)
      MoveItem("wQB01",0,0);
      MoveItem("wBE02",1,0);
      MoveItem("wBE03",1,0);
      MoveItem("wGR04",2,0);
      MoveItem("wGR05",2,0);
      MoveItem("wGR06",2,0);
      MoveItem("wAN07",3,0);
      MoveItem("wAN08",3,0);
      MoveItem("wAN09",3,0);
      MoveItem("wSP10",4,0);
      MoveItem("wSP11",4,0);

      //2 player (Black)
      MoveItem("bQB21", 8,0);
      MoveItem("bBE22", 9,0);
      MoveItem("bBE23", 9,0);
      MoveItem("bGR24",10,0);
      MoveItem("bGR25",10,0);
      MoveItem("bGR26",10,0);
      MoveItem("bAN27",11,0);
      MoveItem("bAN28",11,0);
      MoveItem("bAN29",11,0);
      MoveItem("bSP30",12,0);
      MoveItem("bSP31",12,0);


      for(var i=1; i<35;i++){
        var Objs=ArenaObj[i];
        if (Objs!=undefined){
          if (ItemCoord[i][1]==0){
              for (var j=0;j<Objs.length;j++){
               Objs[j].level(Objs[j].level()+2000);
              };
          };
        };
      };




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

function inArray(elem,array){
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
     if (point.y>3*Size){
       x0_=x0;
       y0_=y0; 
     }else{
       x0_=(sqrt3+1)*Size/2;
       y0_=1.5*Size; 
     };


       xt=Math.round((point.x+sqrt3*Size/2-x0_)/(sqrt3*Size)-1);
       yt=Math.round(-1+(point.y+Size-y0_)/(1.5*Size));
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
  if (j>0){
       x0_=x0;
       y0_=y0; 
     }else{
       x0_=(sqrt3+1)*Size/2;
       y0_=1.5*Size; 
     };

  yc=y0_+ Size*j*1.5;
  if (j % 2 == 0) {
                 xc=x0_+i*sqrt3*Size;
             } else {
                 xc=x0_+0.5*sqrt3*Size+i*sqrt3*Size;
             }
  return new Point(xc, yc);          
};

function Empt(x, y){
  if ((Arena[x][y]==undefined)||(Arena[x][y]=='')){
    return true;
  }else{
    return false;
  };
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

function Sel_Item(x, y, SelectItemColor){
  var pt=ChangeXY(x,y);
  var lvl=LevelNo(Arena[x][y])-1;
  if (lvl<0){lvl=0;};
  var lvl1=170+lvl*100;
  pt.x=pt.x+lvl*lvl_x;
  pt.y=pt.y+lvl*lvl_y;
  var hh=Hexagon(pt, Size);
  hh.opacity(0.9).color(SelectItemColor).lineStyle({lineWidth:4}).level(lvl1);
  return hh;                     
};


function Sel_Item1(x, y, SelectItemColor){
  var pt=ChangeXY(x,y);
  var lvl=LevelNo(Arena[x][y])-1;
  if (lvl<0){lvl=0;};
  var lvl1=170+lvl*100;
  pt.x=pt.x+lvl*lvl_x;
  pt.y=pt.y+lvl*lvl_y;
  var hh=Hexagon(pt, Size);
  hh.opacity(0.5).color(SelectItemColor).lineStyle({lineWidth:3}).level(lvl1);
  return hh;                     
};


function TransTo(Objs, dx, dy, lvl){
  for (var i=0;i<Objs.length;i++){
     var point=Objs[i].position();
     Objs[i].translateTo(point.x+dx, point.y+dy);
     Objs[i].level(lvl+i);
  };
};

function TransTo1(Objs, dx, dy){
  for (var i=0;i<Objs.length;i++){
       var point=Objs[i].position();
       Objs[i].translateTo(point.x+dx, point.y+dy);
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

  var pr=true;
  var AvCells=[];
  var x,y,i,as;

  if (NoMove%2==0){
    //$('#ColorItem').html('<span style="background: #000000; padding: 10px 20px 10px 20px; border: 1px solid #0088cf; color:white;">Black</span>');

    i=21; 
    while ((i<32)&&(pr)){
      x=ItemCoord[i][0];
      y=ItemCoord[i][1];
      as=Arena[x][y];
      AvCells=[];
      if (NoItem(as)==i){
        if (y<1){
          AvCells=AvailableCells(as, x, y); 
        }else{
          AvCells=AvailableMoves(as, x, y); 
        };
      };
      if (AvCells.length!=0){
        pr = false;
      };
      i++;
    };
    if (pr){
      NextMove();
    }

  }else{
    //$('#ColorItem').html('<span style="background: #ffffff; padding: 10px 20px 10px 20px; border: 1px solid #0088cf; color:black;">White</span>');
    
    i=1; 
    while ((i<12)&&(pr)){
      x=ItemCoord[i][0];
      y=ItemCoord[i][1];
      as=Arena[x][y];
      AvCells=[];
      if (NoItem(as)==i){
        if (y<1){
          AvCells=AvailableCells(as, x, y); 
        }else{
          AvCells=AvailableMoves(as, x, y); 
        };
      };
      if (AvCells.length!=0){
        pr = false;
      };
      i++;
    };
    if (pr){
      NextMove();
    }

  };

};


function SameColor(NoMove, ItemStr){

  if ((NoMove%2==0 && ItemStr.substr(0,1)=='b') || (NoMove%2==1 && ItemStr.substr(0,1)=='w')){
    if ((NoMove<=2)&&(ItemStr.substr(1,2)=='QB')){
      return false;
    }else{
      if (((NoMove==7)&&(NoItem(ItemStr)!=1)&&(ItemCoord[01][1]==0))||((NoMove==8)&&(NoItem(ItemStr)!=21)&&(ItemCoord[21][1]==0))){
        return false;
      }else{
        return true;
      };
    };
  }else{
    return false;
  };
};

function BoardEmpty(ar, i){
  var x1,y1,x2,y2;
    var n=ar.length-1;
    if (i==0){
      x1=ar[i+1][0];
      y1=ar[i+1][1];
      x2=ar[n][0];
      y2=ar[n][1]; 
    }else{ 
      if(i==n){
        x1=ar[n-1][0];
        y1=ar[n-1][1];
        x2=ar[0][0];
        y2=ar[0][1]; 
      }else{
        x1=ar[i-1][0];
        y1=ar[i-1][1];
        x2=ar[i+1][0];
        y2=ar[i+1][1]; 
      };
    };
    if ((Empt(x1,y1)&&!Empt(x2,y2))||(Empt(x2,y2)&&!Empt(x1,y1))){
      return true;
    }else{
      return false;
    };
};

function OneStep(x,y){
  ar=BoardCells(x, y);
  var ar1=[];
  for (var i=0; i<ar.length; i++){
    var x1=ar[i][0];
    var y1=ar[i][1];
    if (Empt(x1,y1)&&BoardEmpty(ar,i)){
      ar1.push(ar[i]);
    };
  };
  return ar1;
};

function NextStep(x,y, x_before, y_before, step, maxStep){
  if (step==maxStep){
    if (step==0){
      ABCtemp=ABCtemp.concat(OneStep(x,y));
    }else{
      var ar=OneStep(x,y);
      var ar2=[];
      for (var i=0;i<ar.length;i++){
        if ((ar[i][0]!=x_before)||(ar[i][1]!=y_before)){
          ar2.push([ar[i][0],ar[i][1]]);
        };
      };  
      ABCtemp=ABCtemp.concat(ar2);
    };
  }else{
    var ar=OneStep(x,y);
    var ar2=[];
    for (var i=0;i<ar.length;i++){
      if ((ar[i][0]!=x_before)||(ar[i][1]!=y_before)){
        NextStep(ar[i][0],ar[i][1], x, y, step+1, maxStep);
      };
    };  
  };
};


function AvailableMoves(ItemStr, x, y){
  //can move item?
  var ItemStrTemp=ItemStr;

  ItemStr=ItemStr.substr(0,5);
  var count1=0;

  for (var i=0;i<ItemCoord.length;i++){
    if (ItemCoord[i+1]!=undefined){
      if (ItemCoord[i+1][1]>0){
       count1++;
       if (NoItem(Arena[ItemCoord[i+1][0]][ItemCoord[i+1][1]])!=(i+1)){
         count1--;
       };
      };
    };
  };
  
  RemoveString(ItemStr, x, y);
  ABC=[];
  ABCtemp=[];
  var x1=startx;
  var y1=starty; 
  var ar=[];
  if (NoItem(ItemStr)==1){
    for (var i=ItemCoord.length-1; i>0; i--){
      if (ItemCoord[i]!=undefined){
        if (ItemCoord[i][1]>0){
          x1=ItemCoord[i][0];
          y1=ItemCoord[i][1];
          break;
        };
      };
    };
  }else{
    if (Empt(x1,y1)){
      x1=ItemCoord[01][0];
      y1=ItemCoord[01][1];
    };
  };
  ar=AllBoardCells(x1, y1);
  AddString(ItemStr, x, y)
  
  if (count1<=ABCtemp.length+1){
    // Yes. Item can move.
    
    //QB
    if (ItemStr.substr(1,2)=='QB'){
      return OneStep(x,y);
    };
  
    //AN 
    if (ItemStr.substr(1,2)=='AN'){
      RemoveString(ItemStr, x, y);
      var prStop=true;
      var i=0;
      ar=[];
      while (prStop){
        ABCtemp=[];
        NextStep(x,y,x,y,0,i);
        prStop=false;
        for (j=0;j<ABCtemp.length;j++){
          if (inArray(ABCtemp[j], ar) == -1){
            ar.push(ABCtemp[j]);
            prStop=true
          };
        };
        i++;
      };
      AddString(ItemStr, x, y)
      return ar;    
    };
       
    //BE
    if (ItemStr.substr(1,2)=='BE'){
       ar=BoardCells(x, y);
       var ar1=[];
       for (var i=0; i<ar.length; i++){
         var x1=ar[i][0];
         var y1=ar[i][1];
         if (!Empt(x1,y1)){
           ar1.push(ar[i]);
         }else{
           if (((BoardEmpty(ar,i))&&(ItemStrTemp.length==5))||(ItemStrTemp.length>5)){
             ar1.push(ar[i]);
           };
         };
       };
      return ar1;
    };

    //SP
    if (ItemStr.substr(1,2)=='SP'){
      RemoveString(ItemStr, x, y);
      ABCtemp=[];
      NextStep(x,y,x,y,0,2);
      AddString(ItemStr, x, y)
      return ABCtemp;
    };
    
    //GR  
    if (ItemStr.substr(1,2)=='GR'){
      var ar=BoardCells(x, y);
      var ar1;
      var ar2=[];
      for (var i=0; i<ar.length; i++){
        if (!Empt(ar[i][0], ar[i][1])) {
          ar1=ar;
          while (!Empt(ar1[i][0], ar1[i][1])){
            ar1=BoardCells(ar1[i][0], ar1[i][1]);
          };
          ar2.push([ar1[i][0], ar1[i][1]]);
        };
      };
      return ar2;
    };




    return BoardCells(x, y);

   }else{
    // No. Item can move.
    return [];
  };
};





function AvailableCells(ItemStr, x, y){
  var ar1=[];
  
  if (NoMove==1){ar=[[startx, starty]]};
  if (NoMove==2){ar=BoardCells(startx, starty)};
  if (NoMove>2){
    ABC=[];
    ABCtemp=[];
    
    x=startx;
    y=starty; 
    
    if (Empt(x,y)){
      x=ItemCoord[01][0];
      y=ItemCoord[01][1];
    };
    ar1=AllBoardCells(x, y);
    
    var ar=[];
    
    for (var i=0; i<ar1.length; i++){
      var p=ar1[i];
      var ab=BoardCells(p[0], p[1]);
      for (var j=0; j<ab.length; j++){
        var pr=true;
        var ic=Arena[ab[j][0]][ab[j][1]];
        if (ic!=undefined && ic!=''){
          if (ItemStr.substr(0,1)!=ic.substr(0,1)){
            pr=false;
            break;
          };
        };
      };
      if (pr) {
        ar.push(ar1[i]);
      };
    
    }; 
  };
  return ar;
}; 




function AllBoardCells(x, y){
  var x1,y1;
  var ar=BoardCells(x, y);
  for (var i=0;i<ar.length;i++){
    x1=ar[i][0];
    y1=ar[i][1];
    if (!Empt(x1,y1)){
      if (inArray([x1, y1], ABCtemp)==-1) {
        ABCtemp.push([x1, y1]);
        AllBoardCells(x1, y1);
      };
    }else{
      if (inArray([x1, y1], ABC)==-1) {ABC.push([x1, y1]);}
    };
  };

  return ABC;
};






function SelectAvail(arr){
 var ar=[];
 var x,y;
 for (var i=0;i<arr.length;i++){
        x=arr[i][0];
        y=arr[i][1];
        if ((x>=0) && (y>=0)){
           ar.push(Sel_Item1(x, y, SelectAvailItem));
        };
      };
 return ar;
};


function CheckWin(){
 
  // White Win
  var x=ItemCoord[21][0];
  var y=ItemCoord[21][1];
  var ar=BoardCells(x, y)
  var pr=true;
  if (y>0){
    for (var i=0;i<ar.length;i++){
      if (Empt(ar[i][0],ar[i][1])){
        pr=false;
        break;
      };
    };
  }else{
    pr=false;
  };
  if (pr) {
    PlayerWin=1;
    return true;
  };
 
  // Black Win
  var x=ItemCoord[01][0];
  var y=ItemCoord[01][1];
  var ar=BoardCells(x, y)
  var pr=true;
  if (y>0){
    for (var i=0;i<ar.length;i++){
      if (Empt(ar[i][0],ar[i][1])){
        pr=false;
        break;
      };
    };
  }else{
    pr=false;
  };
  if (pr) {
    PlayerWin=2;
    return true;
  };

  return false;
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





















function InitItems(){
  var xx,yy,No,lvl;      

        //1 player (White)
          
            jc.start(idCanvas,true);
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7, Size*1.2,Size*1.4).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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
                    
                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));
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

                    var lvl1=2;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=2;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.6,a.y-Size*0.7,Size*1.2,Size*1.4).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=2;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=2;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=0;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
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

                    var lvl1=1;
                    a.x=a.x+lvl1*lvl_x;
                    a.y=a.y+lvl1*lvl_y;

                    lvl=ArenaObj[No][2].level();
                    ArenaObj[No].push(jc.image(img[No],a.x-Size*0.5,a.y-Size*0.85,Size,Size*1.7).rotate(-30,'center').level(lvl+1));
                    ArenaObj[No].push(Hexagon(a, Size).color(colorBoard).lineStyle({lineWidth:BoardWidth}).level(lvl+2));                
                  }; 
                 img[No].src="img/SPb.gif";


};


