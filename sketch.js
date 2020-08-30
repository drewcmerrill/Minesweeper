var cols = 20;
var rows = 20;
var w;
var grid;
var numBombs = 50;

function make2DArray(cols, rows)
{
	var arr = new Array(cols);
	for(var i = 0; i < arr.length; i++)
	{
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(601,601);
	w = floor((width - 1) / cols);
	grid = make2DArray(cols, rows);
	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			grid[i][j] = new Cell(i, j, w);
		}
	}

	var options = [];
	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			options.push([i, j]);
		}
	}

	for(var x = 0; x < numBombs; x++)
	{
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		grid[i][j].bomb = true;
		options.splice(index,1);
	}

	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			grid[i][j].countBombs();
		}
	}

	background(255);
}

function draw() {
	for(var i = 0; i < cols; i++)
	{
		for(var j = 0; j < rows; j++)
		{
			grid[i][j].show();
		}
	}

}

function mouseClicked()
{
	if(mouseX < width && mouseY < height)
	{
		var x = floor(mouseX/w);
		var y = floor(mouseY/w);
		grid[x][y].revealed = true;
		if(grid[x][y].bombCount == 0)
		{
			grid[x][y].floodFill();
		}
	}

}
