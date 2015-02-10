HW.Board = function(game) {
    this.game = game;
    this.nodes = [];
    //console.log(game);
    this.group = game.add.group();
    //this.links = [];
    /*for(var i = 0; i<n; i++) {
        var node = new Node(i);
        this.nodes[i] = node;
        console.log('node ', i);
    }*/
};

HW.Board.prototype = {
    init: function(n) {
        for(var i = 0; i<n; i++) {
            var node = new HW.Node(this.game);
            node.create(i, 1);
            this.nodes[i] = node;
            console.log('node ', i);
        }
    },
    getXY: function(x, y) {
        var n = null;
        for (var i=0;i<this.nodes.length;i++) {
            if (this.nodes[i].isXY(x, y)) {
                n = this.nodes[i];
            }
        }
        return n;
    },
    drawLink: function(n1, n2) {
        var x1 = n1.x;
        var y1 = n1.y;
        var x2 = n2.x;
        var y2 = n2.y;
        console.log("link: ", x1,y1,x2,y2);
        this.sprite = this.game.add.sprite();  //Math.abs(x2 - x1), Math.abs(y2 - y1));
        console.log('  graphics');
        var link_graphics = this.game.add.graphics();
        link_graphics.lineStyle(5, 0x278415);
        link_graphics.moveTo(x1, y1);
        link_graphics.lineTo(x2, y2);
        //link_graphics.endFill();
        this.sprite.addChild(link_graphics);
        //this.sprite.anchor.setTo(0.5, 0.5);
        console.log('  new');
        return this.sprite;
        
    },
    generateRandLevel: function() {
        var n = this.nodes.length;
        console.log('nodes: ',n);
        var node;
        for (var i = 0; i < n; i++) {
            do {
                x = Math.floor(40*10 * Math.random());
                y = Math.floor(40*10 * Math.random());
                var placed = this.getXY(x, y);
                //console.log(x, y, placed);
                
            } while(placed != null);
            node = this.nodes[i];
            node.setPosition(x, y);
            //this.nodes[i].setPosition(x,y);
            //grid.add(x, y, true);
            //var n = new Node(i);
            console.log(i, x, y);
            //this.nodes.append([x, y]);
            //this.nodes.push(n);
            //this.group.add(node.getSprite());
            //this.group.add(this.nodes[i].getSprite());
            //nodeGroup.add(n.makeSprite(40 * x, 40 * y));
        }
        var free = [];
        var pending = [];
        var complete = [];
        for (var i = 0; i<n; i++) {free[i] = i;}
        for (var i=0; i<n; i++) {
            console.log('linking ', i);
            var node = this.nodes[i];
            var other;
            while (complete.indexOf(i) == -1) {
                console.log('  sub ', i);
                var ok = true;
                do {
                    var k = Math.floor(n * Math.random());
                    other = this.nodes[k];
                    ok = (complete.indexOf(k) == -1) && (i != k);
                    ok = ok && other.neighbours.indexOf(i) == -1;
                    ok = ok && node.neighbours.indexOf(k) == -1;
                    //var complete = ;//this.getXY(x, y);
                } while(!ok);
                
                if (node.neighbours.push(k) == 3) {
                    free.splice(free.indexOf(i), 1);
                    complete.push(i);
                }
                if (other.neighbours.push(i) == 3) {
                    free.splice(free.indexOf(k), 1);
                    complete.push(k);
                }
                
                
                
                this.group.addChild(this.drawLink(node, other));
                console.log('  next one');
            }
        }
        console.log(' drawing nodes');
        for (var i=0; i<n; i++) {
            node = this.nodes[i];
            console.log('node ', i, node.neighbours);
            this.group.addChild(node.getSprite());
        }
        
        
        return this.group;
    }
    
};