
canvas.addEventListener('click', function(evt) {

	if (hover_tile) {
		board_tiles[hover_tile.x][hover_tile.y] += 1;
	}

	draw_board();

}, false);

canvas.addEventListener('mousemove', function(evt) {

	var mouse_pos = getMousePos(evt);
	if (0 < mouse_pos.x < canvas.width && 0 < mouse_pos.y < canvas.height) {
		cursor_position = new point2d(mouse_pos.x, mouse_pos.y);
	} else {
		cursor_position = null;
	}

	var rad_sq = Math.pow(tile_size / 2, 2);
	hover_tile = null;
	check : {
		for (x = 0; x < board_size; x++) {
			for (y = 0; y < board_size; y++) {
				var center = grid_coord[x][y];
				if (Math.pow(center.x - cursor_position.x, 2) + Math.pow(center.y - cursor_position.y, 2) <= rad_sq) {
					hover_tile = new point2d(x, y);
					break check;
				}
			}
		}
	}

	draw_board();

}, false);

canvas.addEventListener('mouseleave', function(evt) {

	cursor_position = null;
	draw_board();

}, false);