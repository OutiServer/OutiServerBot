class Littlewaremojis {
    constructor(emojiname){
        this.name = emojiname;
        this.number = Math.ceil( Math.random()*13 );
    }
};

module.exports = Littlewaremojis;