HW.Node = function(game) {
    this.game = game;
    //console.log(game);
};

HW.Node.prototype = {
    create: function(id_, type) {
        this.id = id_;
        this.type = type;
        this.prgm = [];
        this.x = 0;
        this.y = 0;
        // index of neighbours in the board
        this.neighbours = [];
        //this.firewall = new Firewall();
        this.sprite = null;
    },
    setPosition: function(x, y) {
        this.x = x;
        this.y = y;
    },
    isXY: function(x, y) {
        return (x == this.x && y == this.y);
    },
    getSprite: function() {
        //console.log('-- ');//, this.x, this.y);
        if (this.sprite == null) {
            this.sprite = this.game.add.sprite(x, y);
            
            //console.log('   **');
            //nodes[i].addChild(node_graphics);
            
            var node_graphics = this.game.add.graphics();
            // TODO: check color                        ******    !!!     ******
            node_graphics.beginFill(0x4286e9);
            node_graphics.drawCircle(0, 0, 20);
            node_graphics.endFill();
            
            this.sprite.addChild(node_graphics);
            //nodes[i].anchor.setTo(0.5, 0.5);
            this.sprite.anchor.setTo(0.5, 0.5);
            this.sprite.inputEnabled = true;
            this.sprite.parentNode = this.id;
            //this.sprite.events.onInputOver.add(nodeOver, this);
            //this.sprite.events.onInputOut.add(nodeOut, this);
        }
        return this.sprite;
    },
    assignRandNeighbour: function(n) {
        /*do {
            var i = Math.floor(null * Math.random());
        }*/
    },
    run: function() {
        var power = 100;
        for (var i=0; i<this.prgm.length; i++) {
            var p = this.prgm[i].run();
            
        }
    }
};
