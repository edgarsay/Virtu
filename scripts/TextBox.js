class TextBox {
    constructor({
        text = new String(),
        textColor= new String("white"),
        box = new Sprite(),
        lineMaxSize = new Number(0),
        border = new Number(0),
        letterW = new Number(10),
        letterH = new Number(20),
    } = {}) {
        this.text = text;
        this.textColor = textColor;
        this.box = box;
        this.lineMaxSize = lineMaxSize == 0 ? ((box.w - border*2)/letterW) : lineMaxSize;
        this.border = border;
        this.letterW = letterW;
        this.letterH = letterH;
    }

    draw(ctxT) {
        ctxT.save();

        this.box.draw(ctxT);
        this.writeText(ctxT);

        ctxT.restore();
    }

    update(){

    }

    writeText(ctxT) {
        ctxT.save();
        let x = this.box.x + this.box.w/2, y =this.box.y + this.box.h/2 + this.letterH;
        //x -= (this.box.w/2 - this.border);
        //let xOringeCenter = (this.box.w/2 - this.border);
        ctxT.fillStyle = this.textColor;
        ctxT.font = "19px undertale";
        
        let lines = [], line = "";
        for(let i = 0;i < this.text.length;++i){
            line += this.text[i];
            if(line.length >= this.lineMaxSize){
                lines.push(line);
                line = "";
            }
        }
        if(line)lines.push(line);
        let start = -(lines.length/2).toFixed(0)
        for(let i = 0, j = start;i < lines.length; ++i, ++j){
            ctxT.fillText(lines[i], x - (lines[0].length/2 * this.letterW), y + j * this.letterH, this.box.w);
        }

        ctxT.restore();
    }

}