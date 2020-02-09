class Card {
    constructor({
        questionFrame = new Sprite(),
        illustrationFrame = new Sprite(),
        option = {
            left: new String(),
            right: new String(),
        },
    } = {}) {
        this.questionFrame = questionFrame;
        this.illustrationFrame = illustrationFrame;
        this.option = option;
    }


}