(function() {
    const WIDTH = 600;
    const HEIGHT = 600;

    const LBOX_W = WIDTH  / 9;
    const LBOX_H = HEIGHT / 9;
    const BBOX_W = WIDTH  / 3;
    const BBOX_H = HEIGHT / 3;

    var elem = document.getElementById('draw-shapes');
    var params = { width: WIDTH, height: HEIGHT };

    var two = new Two(params).appendTo(elem);

    function X(r, c, i) {
        var j = Math.floor(i / 3);
        i %= 3;

        var LRDx1 =     c * BBOX_W          + i * LBOX_W;
        var LRDy1 =     r * BBOX_H          + j * LBOX_H;
        var LRDx2 = 3 * c * LBOX_W + LBOX_W + i * LBOX_W;
        var LRDy2 = 3 * r * LBOX_H + LBOX_H + j * LBOX_H;

        var LRUx1 = c * BBOX_W + i * LBOX_W;
        var LRUy1 = 3 * r * LBOX_H + LBOX_H + j * LBOX_H;
        var LRUx2 = 3 * c * LBOX_W + LBOX_W + i * LBOX_W;
        var LRUy2 = r * BBOX_H + j * LBOX_H;

        this.mark = two.makeGroup(
            two.makeLine(LRDx1, LRDy1, LRDx2, LRDy2)
          , two.makeLine(LRUx1, LRUy1, LRUx2, LRUy2)
        );

        two.update();
    }
    X.prototype.on = function(on) { this.mark.opacity = +on; two.update(); }
    X.prototype.status = function() { return this.mark.opacity === 1.0;}

    function O(r, c, i) {
        var j = Math.floor(i / 3);
        i %= 3;

        var centerX = c * BBOX_W + i * LBOX_W + LBOX_W / 2;
        var centerY = r * BBOX_H + j * LBOX_H + LBOX_H / 2;
        const RADIUS = HEIGHT / (9 * 2) - 3;

        this.mark = two.makeCircle(centerX, centerY, RADIUS);
        two.update();
    }
    O.prototype.on = X.prototype.on;
    O.prototype.status = X.prototype.status;

    function Board() {
        this.mainGrid = two.makeGroup(
            two.makeLine(BBOX_W, 0, BBOX_W, HEIGHT)
          , two.makeLine(2 * (BBOX_W), 0, 2 * (BBOX_W), HEIGHT)

          , two.makeLine(0, BBOX_H, WIDTH, BBOX_H)
          , two.makeLine(0, 2 * (BBOX_H), WIDTH, 2 * (BBOX_H))
        );
        this.mainGrid.linewidth = 3;

        this.littleGrids = new Two.Group();
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var littleGrid = this.mainGrid.clone();
                littleGrid.id = "two-" + i + j;
                littleGrid.scale = 0.333;
                littleGrid.linewidth = 3;
                littleGrid.stroke = "#555555";

                littleGrid.translation = { x: j * BBOX_W, y: i * BBOX_H };
                this.littleGrids.add(littleGrid);
            }
        }
        two.add(this.littleGrids);

        this.xs = [];
        this.os = [];
        for (var r = 0; r < 3; r++) {
            this.xs[r] = [];
            this.os[r] = [];
            for (var c = 0; c < 3; c++) {
                this.xs[r][c] = [];
                this.os[r][c] = [];
                for (var i = 0; i < 9; i++) {
                    var x = new X(r, c, i);
                    x.on(false);
                    this.xs[r][c].push(x);

                    var o = new O(r, c, i);
                    o.on(false);
                    this.os[r][c].push(o);
                }
            }
        }

        this.state = [[]];

        two.update();
    }

    Board.prototype.mark = function(r, c, i, xon) {
        switch (xon) {
        case 0: if (!this.check(r, c, i, 1)) this.xs[r][c][i].on(true); break;
        case 1: if (!this.check(r, c, i, 0)) this.os[r][c][i].on(true); break;
        default: this.xs[r][c][i].on(false); this.os[r][c][i].on(false); break;
        }
    };

    Board.prototype.check = function(r, c, i, xo) {
        switch (xo) {
        case 0: return this.xs[r][c][i].status();
        case 1: return this.os[r][c][i].status();
        default: return false;
        }
    }

    Board.prototype.whoWinner = function(r, c) {
        if (r === undefined && c === undefined) { //macro board check
            //check across and down
            for (var rc = 0; rc <= 2; rc++) {
                var one = this.whoWinner(rc, 0);
                var two = this.whoWinner(rc, 1);
                var tre = this.whoWinner(rc, 2);
                if (one === two && two === tre) return one;

                one = this.whoWinner(0, rc);
                two = this.whoWinner(1, rc);
                tre = this.whoWinner(2, rc);
                if (one === two && two === tre) return one;
            }

            var one = this.whoWinner(0, 0);
            var two = this.whoWinner(1, 1);
            var tre = this.whoWinner(2, 2);
            if (one === two && two === tre) return one;

            one = this.whoWinner(0, 2);
            two = this.whoWinner(1, 1);
            tre = this.whoWinner(2, 0);
            if (one === two && two === tre) return one;
            
            return 2;
        }
        for (var xo = 0; xo < 2; xo++) {
            for (var j = 0; j <= 6; j += 3) {   //check across wins 0 1 2, 3 4 5, 6 7 8 
                if (this.check(r, c, j,     xo) === this.check(r, c, j + 1, xo) 
                 && this.check(r, c, j + 1, xo) === this.check(r, c, j + 2, xo)
                 && this.check(r, c, j, xo) === true) 
                    return xo;
            }
            for (var j = 0; j <= 2; j++) {   //check down wins 0 3 6, 1 4 7, 2 5 8
                if (this.check(r, c, j,     xo) === this.check(r, c, j + 3, xo) 
                 && this.check(r, c, j + 3, xo) === this.check(r, c, j + 6, xo)
                 && this.check(r, c, j, xo) === true) 
                    return xo;
            }

            //check diag wins 0 4 8, 2 4 6
            if (this.check(r, c, 0, xo) === this.check(r, c, 4, xo)
             && this.check(r, c, 4, xo) === this.check(r, c, 8, xo)
             && this.check(r, c, 0, xo) === true)
                return xo;
            else if (this.check(r, c, 2, xo) === this.check(r, c, 4, xo)
                  && this.check(r, c, 4, xo) === this.check(r, c, 6, xo)
                  && this.check(r, c, 2, xo) === true)
                return xo;
        }

        return 2;
    }

    
    var board = new Board();

    var requestAnimationFrame = requestAnimationFrame 
                             || mozRequestAnimationFrame
                             || msRequestAnimationFrame
                             || oRequestAnimationFrame;
    function loop() {
        console.log(board.whoWinner());
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    var turn = 0;
    $('#draw-shapes').click(function(e) {
        var x = e.pageX - $(this).position().left;
        var y = e.pageY - $(this).position().top;

        var boardLoc = function(x, y) {
            var row = 0;
            var col = 0;
            var iii = 0;

            for (col = 1; col <= 3; col++) { if (x < col * BBOX_W) { break; } }
            for (row = 1; row <= 3; row++) { if (y < row * BBOX_H) { break; } }
            
            col -= 1;
            row -= 1;
            x -= col * BBOX_W;
            y -= row * BBOX_H;

            for (var w = 1; w <= 3; w++) { if (x < w * LBOX_W) { break; } }
            for (var h = 1; h <= 3; h++) { if (y < h * LBOX_H) { break; } }

            w -= 1;
            h -= 1;
            iii = 3 * h + w;

            return { r: row, c: col, i: iii };
        }

        loc = boardLoc(x, y);

        console.log(loc.r, loc.c, loc.i);
        board.mark(loc.r, loc.c, loc.i, turn);
        turn = turn === 0 ? 1 : 0;
    });
})();