
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
ctx.setTransform(1, 0 , 0, 1, 0 , 0);
ctx.translate(canvas.width / 2, canvas.height / 2);

var tile_size = 30;
var triangle_height = Math.sqrt(3) / 2 * tile_size;

var cursor_position = null;
var hover_tile = null;

const WHITE = '#fff';
const GRAY = '#aaa';
const RED = '#FF0066';
const BLUE = '#0066FF';
const HIRED = '#FF6699';
const HIBLUE = '#6699FF';

var tile_colors = [ WHITE, RED, BLUE ];
var tile_highlight_colors = [ GRAY, HIRED, HIBLUE ];

function point2d(x, y) {
	this.x = x;
	this.y = y;
}

var graphics_functions = {
	hex_coords : (function() {
		coords = [];
		var hex_angle = Math.PI / 3.0;
		for (var i = 0; i < 6; i++) {
			coords[i] = new point2d(Math.cos(hex_angle * (i + 0.5)), Math.sin(hex_angle * (i + 0.5)));
		}
		return coords;
	})(),
	tile_coord : function(i, j) {
		var center = (board_size - 1) / 2;
		var u = i - center;
		var v = j - center;
		var coord = new point2d((u * tile_size) - (0.5 * v * tile_size), v * triangle_height);
		return coord;
	},
	clear_canvas : function() {
		ctx.save();
		ctx.setTransform(1, 0 , 0, 1, 0 , 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
	},
	draw_hexagon : function (pos, radius, color, rotation) {
		rotation = rotation || 0;

		ctx.translate(pos.x, pos.y);
		ctx.rotate(rotation);
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.moveTo(graphics_functions.hex_coords[0].x * radius, graphics_functions.hex_coords[0].y * radius);
		for (var i = 1; i < graphics_functions.hex_coords.length; i++) {
			ctx.lineTo(graphics_functions.hex_coords[i].x * radius, graphics_functions.hex_coords[i].y * radius);
		}
		ctx.closePath();
		ctx.fill();
		ctx.rotate(-rotation);
		ctx.translate(-pos.x, -pos.y);
	},
	draw_tiles : function() {
		for (var x = 0; x < board_size; x++) {
			for (var y = 0; y < board_size; y++) {
				var hover = hover_tile && (hover_tile.x == x && hover_tile.y == y);
				var fill = hover ? tile_highlight_colors[board_tiles[x][y]] : tile_colors[board_tiles[x][y]];
				graphics_functions.draw_hexagon(grid_coord[x][y], tile_size / 2, fill);
			}
		}
	},
	draw_borders : function () {

	},
	draw_cursor : function() {
		if (!cursor_position) {
			return;
		}
		graphics_functions.draw_hexagon(cursor_position, 10, '#0066ff', cursor_position.x + cursor_position.y)
	}
};

var grid_coord = [];
for (var x = 0; x < board_size; x++) {
	grid_coord[x] = [];
	for (var y = 0; y < board_size; y++) {
		grid_coord[x][y] = graphics_functions.tile_coord(x, y);
	}
}

function draw_board() {

	graphics_functions.clear_canvas();
	graphics_functions.draw_tiles();
	graphics_functions.draw_borders();
	graphics_functions.draw_cursor();

}

draw_board();

