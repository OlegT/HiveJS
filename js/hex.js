
//HEXAGON ARRAY --BEGIN
function HexagonArray(option) {

    this.sizeX = option.sizeX || 2;
    this.sizeY = option.sizeY || 2;
    this.body = option.svg || document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.margin = option.margin || 0;
    this.fill = option.fill || 'rgb(0,0,0)';
    this.stroke = option.stroke || 'rgb(64,64,64)';
    this.array = [];


    var cellSize = option.cellSize || 30;
    var _half_size = cellSize / 2;
    var _root_size = cellSize * root_3;
    var _one_half_size = cellSize + _half_size;
    var _three_size = cellSize * 3;


    var option = { fill: this.fill, stroke: this.stroke };
    for (var i = 0; i < this.sizeX; i++) {
        for (var j = 0; j < this.sizeY; j++) {
 
            if (j % 2 == 0) {
                var hexagon = new Hexagon(i * _three_size, j * _root_size / 2, cellSize, option);
            } else {
                var hexagon = new Hexagon((i - 1) * _three_size + _one_half_size, j * _root_size / 2 - _root_size, cellSize, option);
            }

 
            hexagon.body.setAttribute('data-x', i);
            hexagon.body.setAttribute('data-y', j);
            hexagon.positionX = i;
            hexagon.positionY = j;

 
            this.body.appendChild(hexagon.body);
            this.array.push(hexagon);
        }
    }
}
HexagonArray.prototype.getHexagon = function (x, y) {
    for (var i in this.array) {
        if (this.array[i].positionX == x && this.array[i].positionY == y) {
            return this.array[i];
        }
    }
    return null;
};
var root_3 = Math.sqrt(3);
function Hexagon(x, y, size, option) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.points = '';
    this.fill = option.fill || 'white';
    this.stroke = option.stroke || 'black';
    this.strokeWidth = 0.1;
    this.body = document.createElementNS("http://www.w3.org/2000/svg", "polygon");


    this.draw();
}
Hexagon.prototype.draw = function () {

    var _half_size = this.size / 2;

 
    this.points = '';
    this.points += (this.x + this.size) + ',' + (this.y + 0) + ' ';
    this.points += (this.x + _half_size) + ',' + (this.y + (_half_size * root_3)) + ' ';
    this.points += (this.x - _half_size) + ',' + (this.y + (_half_size * root_3)) + ' ';
    this.points += (this.x - this.size) + ',' + (this.y) + ' ';
    this.points += (this.x - _half_size) + ',' + (this.y - (_half_size * root_3)) + ' ';
    this.points += (this.x + _half_size) + ',' + (this.y - (_half_size * root_3));

 
    this.body.setAttribute('fill', this.fill);
    this.body.setAttribute('stroke', this.stroke);
    this.body.setAttribute('stroke-width', this.strokeWidth);
    this.body.setAttribute('points', this.points);
};
//HEXAGON ARRAY  --END



















//ELEMENTS ARRAY --BEGIN
function ElementArray(option) {

    this.sizeX = option.sizeX || 2;
    this.sizeY = option.sizeY || 2;
    this.body = option.svg || document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.margin = option.margin || 0;
    this.fill = option.fill || 'rgb(0,0,0)';
    this.stroke = option.stroke || 'rgb(64,64,64)';
    this.array = [];


    var cellSize = option.cellSize || 30;
    var _half_size = cellSize / 2;
    var _root_size = cellSize * root_3;
    var _one_half_size = cellSize + _half_size;
    var _three_size = cellSize * 3;


    var option = { fill: this.fill, stroke: this.stroke };
    for (var i = 0; i < this.sizeX; i++) {
        for (var j = 0; j < this.sizeY; j++) {
 
            if (j % 2 == 0) {
                var element = new Element(i * _three_size, j * _root_size / 2, cellSize, option, i, j);
            } else {
                var element = new Element((i - 1) * _three_size + _one_half_size, j * _root_size / 2 - _root_size, cellSize, option, i, j);
            }

 
            element.body.setAttribute('edata-x', i);
            element.body.setAttribute('edata-y', j);
            element.positionX = i;
            element.positionY = j;

 
            this.body.appendChild(element.body);
            this.array.push(element);
        }
    }
}
ElementArray.prototype.getElement = function (x, y) {
    for (var i in this.array) {
        if (this.array[i].positionX == x && this.array[i].positionY == y) {
            return this.array[i];
        }
    }
    return null;
};
function Element(x, y, size, option, xe, ye) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.points = '';
    this.fill = option.fill || 'white';
    this.stroke = option.stroke || 'black';
    this.strokeWidth = 0.1;
    this.body = document.createElementNS("http://www.w3.org/2000/svg", "polygon");


    this.draw(xe, ye);
}
Element.prototype.draw = function (xe, ye) {

    var _half_size = this.size / 2;
    this.points = '';

    if (xe>0 && ye>1){
     this.points += (this.x - this.size/2) + ',' + (this.y + 0) + ' ';
     this.points += (this.x + this.size/2) + ',' + (this.y + 0) + ' ';
    }

 
    this.body.setAttribute('fill', this.fill);
    this.body.setAttribute('stroke', this.stroke);
    this.body.setAttribute('stroke-width', this.strokeWidth);
    this.body.setAttribute('points', this.points);
};
//ELEMENTS ARRAY  --END






















window.addEventListener('load', function () {
    canvas = document.getElementById('canvas');
    //canvas.setAttribute('width',  '100%');
    canvas.setAttribute('height', '65%');
    canvas.setAttribute('viewBox', '0 0 150 150');


    var hexagonArray = new HexagonArray({
        svg: canvas,
        cellSize: 5,
        sizeX: 12,
        sizeY: 48,
        fill: 'rgb(255,255,255)',
        stroke: 'rgb(64,64,64)'
    });

    var elementArray = new ElementArray({
        svg: canvas,
        cellSize: 5,
        sizeX: 12,
        sizeY: 48,
        fill: 'rgb(255,255,255)',
        stroke: 'rgb(64,64,64)'
    });

    var beforeData = [];
    var xt=0;
    var yt=0; 

    function onMouseOver() {

        beforeData.forEach(function (item) {
            if (item) {
                item.setAttribute('fill','white');
            }
        });

 
        beforeData = new Array();


        var x = parseInt(this.getAttribute('data-x'));
        var y = parseInt(this.getAttribute('data-y'));
        beforeData = [];

 
        if (y % 2 == 0) {
            beforeData.push(document.querySelector('[data-x="' + (x + 1) + '"][data-y="' + (y + 1) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x + 1) + '"][data-y="' + (y + 3) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y + 2) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y + 3) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y + 1) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y - 2) + '"]'));
        } else {
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y - 3) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y - 1) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y + 2) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x - 1) + '"][data-y="' + (y - 1) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x - 1) + '"][data-y="' + (y - 3) + '"]'));
            beforeData.push(document.querySelector('[data-x="' + (x) + '"][data-y="' + (y - 2) + '"]'));
        }
        beforeData.forEach(function (item) {
            if (item) {
                item.setAttribute('fill','white');
            }
        });

 
        beforeData.push(this);
                


        var hexagon = hexagonArray.getHexagon(x, y);
        hexagon.size += 0;
        hexagon.fill = 'white';//gray
        canvas.appendChild(hexagon.body);
        hexagon.draw();
    }

    function onMouseLeave() {

        var x = parseInt(this.getAttribute('data-x'));
        var y = parseInt(this.getAttribute('data-y'));

 
        var hexagon = hexagonArray.getHexagon(x, y);
        hexagon.size -= 0;
        hexagon.draw();
    }







    function onMouseUp() {

        var x = parseInt(this.getAttribute('data-x'));
        var y = parseInt(this.getAttribute('data-y'));

        var hexagon = hexagonArray.getHexagon(x, y);
        hexagon.size += 0;
        hexagon.fill = 'blue';
        canvas.appendChild(hexagon.body);
        hexagon.draw();
        
        xt = parseInt(x*hexagon.size);
        yt = parseInt(y*hexagon.size);
        //canvas.setAttribute('viewBox', xt + ' ' + yt + ' 150 150 ');
    }

    function onMouseDown() {

        var x = parseInt(this.getAttribute('data-x'));
        var y = parseInt(this.getAttribute('data-y'));

        var hexagon = hexagonArray.getHexagon(x, y);
   
        //hexagon .size = 100;
        hexagon.fill = 'red';
        canvas.appendChild(hexagon.body);
        hexagon.draw();
        
        xt = parseInt(hexagon.sizeX );
        yt = parseInt(hexagon.y);
        //canvas.setAttribute('viewBox', xt + ' ' + yt + ' 150 150 ');
    }


    hexagonArray.array.forEach(function (item, index) {
        //item.body.onmouseover = onMouseOver;
        //item.body.onmouseout = onMouseLeave;
        item.body.onmouseup = onMouseUp;
        item.body.onmousedown = onMouseDown;
    });
});