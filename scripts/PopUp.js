class PopUp {
    constructor({
        message = new String(),
        letterW = 10,
        letterH = 20,
        frame = new Sprite(),
        lineMaxSize = new Number(0),
        border = new Number(15),
        adj = {
            x: 0,
            y: 0,
        },
        on = false,
        alpha = 0,
        dalpha = 0.01,
        scale = 0,
        dscale = 0.01,
    } = {}) {
        this.message = message;
        this.letterW = letterW;
        this.letterH = letterH;
        this.frame = frame;
        this.border = border;
        this.lineMaxSize = lineMaxSize == 0 ? (frame.w - border*2)/10: lineMaxSize;
        this.adj = adj;
        this.on = on;
        this.alpha = alpha;
        this.dalpha = dalpha;
        this.dscale = dscale;
        this.scale = scale;
    }

    draw(ctxT) {
        ctxT.save();

        ctxT.globalAlpha = this.alpha;
        
        this.frame.scaledDraw(ctxT,this.scale);
        this.writeMenssage(ctxT);

        ctxT.restore();
    }

    update() {

    }

    writeMenssage(ctxT) {
        
        
        let {
            x,
            y,
        } = this.adj;
        x -= (this.frame.w/2 - this.border);
        let xOringeCenter = (this.frame.w/2 - this.border);
        ctxT.save();
        ctxT.setTransform(this.scale, 0, 0, this.scale, this.frame.x + x + xOringeCenter, this.frame.y + y);
        ctxT.fillStyle = "white"
        ctxT.font = "19px undertale";
        
        let lines = [], line = "";
        for(let i = 0;i < this.message.length;++i){
            line += this.message[i];
            if(line.length == this.lineMaxSize){
                lines.push(line);
                line = "";
            }
        }

        if(line)lines.push(line);
        let start = -(lines.length/2).toFixed(0)
        for(let i = 0, j = start;i < lines.length; ++i, ++j){
            ctxT.fillText(lines[i], -(lines[0].length/2 * this.letterW), y/2 + j * this.letterH, this.frame.w);
        }
       
        ctxT.restore();
    }

    incScale(n = new Number()){
        n = this.scale + n;
        this.scale = Math.min(1, Math.max(n, 0));
    }
    incAlpha(n = new Number()){
        n = this.alpha + n;
        this.alpha = Math.min(1, Math.max(n, 0));
    }

    setOn(n = new Boolean()) {
        this.on = n;
    }
}