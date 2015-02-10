HW.MainMenu = function(game) {};

HW.MainMenu.prototype = {
    create: function() {
        console.log('show button');
        this.StartBtn = this.add.button((320-146)/2, 200, 'btn-start', this.startGame, this);
    },
    startGame: function() {
        this.game.state.start('Game');
    }
                                    
};