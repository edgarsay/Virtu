class Game {
    constructor({
        //frame counter
        frames = new Number(0),
        //states of the game
        state = new Array(),
        //sprites source
        imagePath = new String("/img/sprite.png"),
        //valid key input in the game
        controlls = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
        //last button pressed
        b = null,
        displays = Array(),
        background = new Display({}),
        foreground = new Display({}),
        transition = ["slidedown", "slideup"],
        width = "320",
        height = "480",
    } = {}) {
        this.frames = frames;
        this.state = state;
        let tmp = new Image();
        tmp.src = imagePath;
        this.img = tmp;
        this.controlls = controlls;
        this.mouse = {px:0, py:0, x:0, y:0};
        this.b = b;
        this.waitB = false;
        this.displays = displays;
        this.background = background;
        this.foreground = foreground;
        this.transition = transition;
        this.globalValue = {};
        this.width = width;
        this.height = height;
        this.gamepad = null;
    }

    setB(n = null) {
        this.b = n;
    }
    getFrames() {
        return this.frames;
    }
    setFrames(n = new Number()) {
        this.frames = n;
    }
    incFrames() {
        this.waitB = false;
        this.frames += 1;
    }
    setBackground(n = new Display({})){
        this.background = n;
    }
    setForeground(n = new Display({})){
        this.foreground = n;
    }

    draw() {
        for (let d of this.displays)
            d.draw();
    }

    //should update all the "animeted" elements of the game
    update() {
        for(let d of this.displays){
            for(let s of d.sprites){
                s.update();
            }
        }
    }

    loop() {
        if (game.gamepad)
            game.gamepadUpdateHandler();
        if (game.b && !game.waitB) {
            game.eventInput(game.b);
            game.setB(null);
        }
        game.update();
        game.draw();
        game.incFrames(); //frames++;

        requestAnimationFrame(game.loop);
    }

    stateIsEqual(n = new Number()) {
        return this.state[0] === this.state[n];
    }

    setState(n = new Number) {
        this.state[0] = this.state[n];
    }

    setDisplays(n = new Array()) {
        this.displays = n;
        displays.forEach((e) => {
            for (let c of this.controlls)
                if (e.keysResponse[c] == undefined)
                    e.keysResponse[c] = () => {};
        });
    }

    changeScreens(n = Number()) {
        let trans = this.transition;
        for (let i = 1; i < this.displays.length; ++i) {
            if (i === n) {
                this.displays[i].setDivClass(trans[0]);
            } else {
                this.displays[i].setDivClass(trans[1]);
            }
        }
    }


    eventInput(input = new String()) {
        if (!this.controlls.some(e => e == input))
            return;
        let currentDisplay = this.displays[this.state[0]];
        let outputs = currentDisplay.eventInput(input);
        if (outputs) {
            for(let output of outputs){
                let end = output.length,pointer = game, o = 0;
                for(;o < end; ++o){
                    if(o == end - 2){
                        pointer[output[o]](output[o+1]);
                        break;
                    }
                    pointer = pointer[output[o]];

                    if(pointer === undefined){
                        console.log("%cOUTPUT ERRO:", "color:red", output[o]);
                        console.log("%cDISPLAY:", "color:red", currentDisplay);
                        console.log("%cINPUT:", "color:red", input);
                        break;
                    }
                }
            }
        }
    }

    //gamepad handler
    gamepadUpdateHandler() {
        let controller = this.gamepad;
        if (controller.buttons) {
            for (let b = 0; b < controller.buttons.length; b++) {
                if (controller.buttons[b].pressed) {
                    let i = null;
                    switch (b) {
                        case 2:
                            i = "ArrowUp"
                            break;
                        case 12:
                            i = "ArrowUp"
                            break;
                        case 13:
                            i = "ArrowRight"
                            break;
                        case 14:
                            i = "ArrowDown"
                            break;
                        case 15:
                            i = "ArrowLeft"
                            break;
                    }
                    this.setB(i)
                    //this.waitB = true;
                }
            }
        }
    }
}