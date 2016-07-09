var faceDirections = {
    up: "up",
    right: "right",
    down: "down",
    left: "left"
},
    body = document.querySelector("body");


function Caterpillar(x, y, faceDirection) {
    this.x = x || 0;
    this.y = y || 0;
    this.faceDirection = faceDirection || "up";
    this.angle = function (dir) {
        switch (dir) {
            case "up":
                return 270;
                break;
            case "right":
                return 0;
                break;
            case "down":
                return 90;
                break;
            case "left":
                return 180
        }
    }(this.faceDirection);
    this.transformState = 1; //1 = Caterpillar;  2 = Cacoon; 3 = Butterfly
};

Caterpillar.prototype.render = function () {
    this.elem = document.createElement("div");
    this.elem.style.backgroundImage = "url(caterpillar.png)";
    this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
    this.elem.style.top = this.y + "px";
    this.elem.style.left = this.x + "px";
    document.body.appendChild(this.elem);
}

Caterpillar.prototype.angleLeft = function () {
    this.angle -= 90;
    this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
}

Caterpillar.prototype.angleRigth = function () {
    this.angle += 90;
    this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
}

Caterpillar.prototype.turnAround = function (){
    switch(this.faceDirection){
        case "up":
            this.faceDirection = faceDirections.down;
            this.y+=60;
            this.angle+=180;
            this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
            this.elem.style.top = this.y + "px";
            break;
        case "down":
            this.faceDirection = faceDirections.up;
            this.y-=60;
            this.angle+=180;
            this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
            this.elem.style.top = this.y + "px";
            break;
        case "left":
            this.faceDirection = faceDirections.right;
            this.x+=60;
            this.angle+=180;
            this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
            this.elem.style.left = this.x + "px";
            break;
        case "right":
            this.faceDirection = faceDirections.left;
            this.x-=60;
            this.angle+=180;
            this.elem.style.transform = 'rotate(' + this.angle + 'deg)';
            this.elem.style.left = this.x + "px";
    }

}

Caterpillar.prototype.turnLeft = function () {
    var that = this;
    switch (that.faceDirection) {
        case "up":
            that.faceDirection = faceDirections.left;
            that.angleLeft();
            break;
        case "right":
            that.faceDirection = faceDirections.up;
            that.angleLeft();
            break;
        case "down":
            that.faceDirection = faceDirections.right;
            that.angleLeft();
            break;
        case "left":
            that.faceDirection = faceDirections.down;
            that.angleLeft();
    }

};

Caterpillar.prototype.turnRight = function () {
    var that = this;
    switch (that.faceDirection) {
        case "down":
            that.faceDirection = faceDirections.left;
            that.angleRigth()
            break;
        case "left":
            that.faceDirection = faceDirections.up;
            that.angleRigth()
            break;
        case "up":
            that.faceDirection = faceDirections.right;
            that.angleRigth()
            break;
        case "right":
            that.faceDirection = faceDirections.down;
            that.angleRigth()
    }
};


Caterpillar.prototype.move = function () {
    var that = this;
    if(!helper.isCollide(that.elem,body)){
        that.turnAround();
    };

    var step = function(){
        switch (that.transformState){
            case 1:
                return 1;
            break;
            case 2:
                return 0;
            break;
            case 3:
                return 10;
            break;
        }
    }();

    switch (this.faceDirection) {
        case 'up' :
            this.y -= step;
            break;
        case 'down' :
            this.y += step;
            break;
        case 'right':
            this.x += step;
            break;
        case 'left':
            this.x -= step;
    }
    this.elem.style.top = this.y + "px";
    this.elem.style.left = this.x + "px";
}

Caterpillar.prototype.transformation = function () {
    switch (this.transformState) {
        case 1:
            this.transformState = 2;
            this.elem.style.backgroundImage = "url(cacoon.png)";
            break;
        case 2:
            this.transformState = 3;
            var bfNum = Math.floor(7 * Math.random()) + 1;
            this.elem.style.backgroundImage = "url(bf"+bfNum+".png)";
            this.elem.style.zIndex = 500;
            break
        default:
            return;
    }
    setTimeout(this.transformation.bind(this),20000);
}


function createCP() {
    var randDir = Math.floor(4 * Math.random()) + 1,
        faceDir = function () {
            switch (randDir) {
                case 1:
                    return faceDirections.up;
                    break;
                case 2:
                    return faceDirections.right;
                    break;
                case 3:
                    return faceDirections.down;
                    break;
                case 4:
                    return faceDirections.left;
            }
        }(),
        randX = Math.floor(1600 * Math.random()),
        randY = Math.floor(700 * Math.random()),
        newCP = new Caterpillar(randX, randY, faceDir);
    newCP.render();
    newCP.randomTurn();
    newCP.moveCP();
    setTimeout(newCP.transformation.bind(newCP),20000);
    setTimeout(createCP, Math.floor(13000 * Math.random()) + 1)
}

Caterpillar.prototype.randomTurn = function () {
    var that = this;
    var randSide = Math.floor(2 * Math.random()) + 1,
        turn = function () {
            switch (randSide) {
                case 1:
                    return that.turnRight;
                    break;
                case 2:
                    return that.turnLeft;
            }
        }();
    turn.call(that);
    setTimeout(that.randomTurn.bind(that), Math.floor(10000 * Math.random()) + 1);
}

Caterpillar.prototype.moveCP = function () {
    this.move.call(this);
    setTimeout(this.moveCP.bind(this), 50);
}


//testing zone..

// //
// var testCP = new Caterpillar(900,300,"right");
// testCP.render();
// setTimeout(testCP.transformation.bind(testCP),500);
//
// testCP.randomTurn();
// testCP.moveCP();


//this starts the show
createCP();
