HW.Game = function(game) {};

HW.Game.prototype = {
    create: function() {
        //console.log('show button');
        //this.StartBtn = this.add.button((320-146)/2, 200, 'btn-start', this.startGame, this);
        this.board = new HW.Board(this.game);
        this.board.init(10);
    //},
    //startGame: function() {
        console.log('load game');
        //var board = new HW.Board(game);
        
        this.game.stage.addChild(this.board.generateRandLevel());
    }
                                    
};