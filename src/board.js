HW.Board = function(game) {
    this.game = game;
    this.nodes = [];
    //console.log(game);
    this.group = game.add.group();
    this.groupLink = game.add.group();
    this.groupNode = game.add.group();
    this.group.add(this.groupLink);
    this.group.add(this.groupNode);
    //
    this.activeNode = null;
};

function remove(arr, v) {
    ar2 = [];
    for (var i=0;i<arr.length;i++) {
        var w = arr[i];
        if(w!=v) {
            ar2.push(w);
        }
    }
    return ar2;
}
/*
function removeIdx(arr, idx) {
    ar2 = [];
    for (var i=0;i<arr.length;i++) {
        var w = arr[i];
        if(w!=v) {
            ar2.push(w);
        }
    }
    return ar2;
}*/

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
    nodeOver: function(t) {
        console.log('click node', t.parentNode, this);
        //activePanel = new Panel(['Hello','World']);
        this.activeNode = this.nodes[t.parentNode];
        
        //var spr = activePanel.makeSprite();
        console.log('---> ', this.activeNode.id); //spr.x, spr.y, spr.width, spr.height);
        //uiGroup.add(spr);
    },
    nodeOut: function (t) {
        this.activeNode = null;
        console.log('<--', t.parentNode);
    },
    generateRandLevel: function() {
        var n = this.nodes.length;
        console.log('nodes: ',n);
        var node;
        // creation des noeuds
        for (var i = 0; i < n; i++) {
            // trouver une position non occupee
            do {
                x = Math.floor(40*10 * Math.random());
                y = Math.floor(40*10 * Math.random());
                var placed = this.getXY(x, y);
                //console.log(x, y, placed);
                
            } while(placed != null);
            node = this.nodes[i];
            node.setPosition(x, y);
            //
            console.log(i, x, y);
            // creer le sprite associe
            //this.group.addChild(node.getSprite());
            //
        }
        // noeuds avant/pendant/apres traitement des connexions
        var free = [];  // !!! indexes in this.nodes
        var pending = [];
        var complete = [];
        // initialiser la liste des index
        for (var i = 0; i<n; i++) {
            free.push(i);
        }
        // creation des connexions
        for (var i=0; i<n; i++) {
            console.log('linking ', i);
            // selection d'un noeud
            var node = this.nodes[i];
            var other;
            // s'assurer que le traitement est complet
            if (complete.length < n) {
            while (node.neighbours.length < 3) {
                //console.log('  sub ', i);
                var ok = true;
                var free2 = remove(free, i);
                var pending2 = remove(pending, i);
                // encore des noeuds libres -> en selctionner un
                if (free2.length > 0) {
                    console.log(' -- free ', free[0]);
                    //do {
                        var j = Math.floor(free2.length * Math.random());
                        var k = free2[j];  // j-iem value in free is index in nodes
                    //} while(k!=i);
                    other = this.nodes[k];
                    // node will have connection, remove it from free list
                    //free.splice(j, 1);
                    free = remove(free,k);
                    pending.push(k);
                } else {
                    //do {
                        // sinon un en cours de traitement
                        var j = Math.floor(pending2.length * Math.random());
                        var k = pending2[j]; // same with pending
                    //} while(k!=i);
                    console.log(' -- pending', j, pending);
                    other = this.nodes[k];
                }
                console.log('other : ', k, j ,other, complete.length);
                // voisins complets -> traitement fini pour le noeud courant
                node.neighbours.push(k);
                other.neighbours.push(i);
                if (node.neighbours.length >= 3) {
                    //pending.splice(pending.indexOf(i), 1);
                    pending = remove(pending, i);
                    complete.push(i);
                }
                // '' -> pour l'autre noeud (cette connexion a fini le noeud, plus besoin d'y revenir)
                if (other.neighbours.length >= 3) {
                    //pending.splice(pending.indexOf(k), 1);
                    pending = remove(pending, k);
                    complete.push(k);
                }
                
                // ajouter le sprite associe au lien
                
                this.groupLink.addChild(this.drawLink(node, other));
                console.log('  next one');
            }
            }
        }
        // pour dessiner les noeuds apres les liens, pour masquer la portion des liens qui deborde sur le noeud
        console.log(' drawing nodes');
        for (var i=0; i<n; i++) {
            node = this.nodes[i];
            console.log('node ', i, node.neighbours);
            var sprite = node.getSprite();
            sprite.events.onInputOver.add(this.nodeOver, this);
            sprite.events.onInputOut.add(this.nodeOut, this);
            this.groupNode.addChild(sprite);
        }
        console.log('group size ', this.group.children.length);
        
        return this.group;
    }
    
};