//!Get Canvas
let displays = new Array()
let tmp;

//background div
let test = new TextBox({
    text: "Uma província se opõe ao seu principado.Seu exercício esta forte, porém não possui apoio da população da província",
    textColor: "#DE831A",
    box: A,
    border:15,
})

tmp = new Display({
    number : "",
    divId : "background",
    cnvsId : "canvas-",
    backgroundColor: "#000000",
    sprites : [
        test,
        D,
    ]
})
displays.push(tmp);
game.setBackground(tmp);



//one
tmp = new Display({
    number : "1",
    divId : "one",
    cnvsId : "canvas1",
    keysResponse: {
        'ArrowRight': () => {
            return [
                ["foreground","sprites",1,"incScale",0.03],
                ["foreground","sprites",1,"incAlpha",0.03],

                ["foreground","sprites",0,"incScale",-0.03],
                ["foreground","sprites",0,"incAlpha",-0.03],
            ];
        },
        'ArrowLeft': () => {
            return [
                ["foreground","sprites",0,"incScale",0.03],
                ["foreground","sprites",0,"incAlpha",0.03],

                ["foreground","sprites",1,"incScale",-0.03],
                ["foreground","sprites",1,"incAlpha",-0.03],
            ];
        },
    },
    sprites : [
        king,
    ]
})
displays.push(tmp);

//foreground div
let optionLeft = new PopUp({
    spriteImageW: 640,
    border: 50,
    adj:{
        x:B.w/2,
        y:B.h/2,
    },
    frame: B,
    message: "Não anexa-la.",
});
let optionRight = new PopUp({
    spriteImageW: 640,
    border: 50,
    adj:{
        x:C.w/2,
        y:C.h/2,
    },
    frame: C,
    message:"Anexa-la.",
});

tmp = new Display({
    number : "",
    divId : "foreground",
    cnvsId : "canvas+",
    sprites : [
        optionLeft,
        optionRight,
    ]
})
displays.push(tmp);
game.setForeground(tmp);

game.setDisplays(displays);

//!End Get Canvas