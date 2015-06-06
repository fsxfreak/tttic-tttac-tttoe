(function() {
	var elem = document.getElementById('draw-shapes');

	

	const WIDTH = 600;
	const HEIGHT = 600;

	var params = { width: WIDTH, height: HEIGHT };
	var two = new Two(params).appendTo(elem);

	var mainGrid = two.makeGroup(
		two.makeLine(WIDTH / 3, 0, WIDTH / 3, HEIGHT)
	  , two.makeLine(2 * (WIDTH / 3), 0, 2 * (WIDTH / 3), HEIGHT)

	  , two.makeLine(0, HEIGHT / 3, WIDTH, HEIGHT / 3)
	  , two.makeLine(0, 2 * (HEIGHT / 3), WIDTH, 2 * (HEIGHT / 3))
	);
	mainGrid.linewidth = 3;

	var littleGrids = new Two.Group();
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			var littleGrid = mainGrid.clone();
			littleGrid.scale = 0.333;
			littleGrid.linewidth = 3;
			littleGrid.stroke = "#555555";

			littleGrid.translation = { x: i * WIDTH / 3, y: j * HEIGHT / 3 };
			littleGrids.add(littleGrid);
		}
	}
	two.add(littleGrids);

	two.update();
})();