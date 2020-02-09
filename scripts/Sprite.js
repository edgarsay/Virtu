class Sprite {

    constructor({
        imagePath = new String("/img/sprite.png"),
        animation = new Array(),
        sX = 0,
        sY = 0,
        w = 0,
        h = 0,
        x = 0,
        y = 0,
        dx = 0,
        rotation = 0,
        frame = 0,
        position = new Array(),
        mulplayDraw = false,
    } = {}) {
        this.DEGREE = Math.PI / 180;
        let tmp = new Image();
        tmp.src = imagePath;
        this.img = tmp;
        this.animation = animation;
        this.sX = sX;
        this.sY = sY;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.rotation = rotation;
        this.frame = frame;
        this.position = position;
        this.mulplayDraw = mulplayDraw;
    }

    getX(){
        return this.x;
    }
    setX(n = new Number){
        this.x = n;
    }
    getY(){
        return this.y;
    }
    setY(n = new Number){
        this.y = n;
    }
    
    draw (ctxT) {
        ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        if(this.mulplayDraw)
            ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

    scaledDraw(ctxT, scale){
        ctxT.save();
        let image = this.img;
        let cx = this.x + (this.w/2), cy = this.y + (this.h/2);
        ctxT.setTransform(scale, 0, 0, scale, cx, cy);
        ctxT.drawImage(this.img, this.sX, this.sY, this.w, this.h, -this.w / 2, -this.h/2, this.w, this.h);
        ctxT.restore();
    }
    
    update () {
    }
}