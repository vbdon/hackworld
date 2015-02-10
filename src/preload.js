HW.Preload = function(game) {}

HW.Preload.prototype = {
    preload: function() {
        //console.log(this.game);
        this.load.image('btn-start', 'img/button-start.png');
        console.log('Preload -> OK');
        // load assets  
    },
    create: function() {
        this.game.state.start('MainMenu');
    }
    
    
    
    
    
};