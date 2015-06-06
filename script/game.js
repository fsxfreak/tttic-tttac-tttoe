(function() {
    const WIDTH = 600;
    const HEIGHT = 600;

    const LBOX_W = WIDTH  / 9;
    const BBOX_W = WIDTH  / 3;
    const LBOX_H = HEIGHT / 9;
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
        for (var r = 0; r < 3; r++) {
            this.xs[r] = [];
            for (var c = 0; c < 3; c++) {
                this.xs[r][c] = [];
                for (var i = 0; i < 9; i++) {
                    var x = new X(r, c, i);
                    x.on(false);
                    this.xs[r][c].push(x);
                }
            }
        }

        two.update();
    }

    Board.prototype.mark = function(r, c, i, xon) {
        switch (xon) {
        case 0: this.xs[r][c][i].on(true); break;
        case 1: this.xs[r][c][i].on(false); break;
        case 2: this.xs[r][c][i].on(false); break;
        }
    };

    var board = new Board();
    board.mark(1, 1, 4, 0);
})();