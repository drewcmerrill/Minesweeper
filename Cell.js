function Cell(i, j, w)
{
  this.i = i;
  this.j = j;
  this.w = w;
  this.bomb = false;
  this.revealed = false;
  this.bombCount = 0;
  this.flag = false;

  this.show = function()
  {
    if(this.revealed)
    {
      strokeWeight(2);
      fill(200);
      rect(this.i * this.w, this.j * this.w, this.w, this.w);
      if(this.bomb)
      {
        fill(0);
        ellipse((this.i * this.w )+ this.w/2, (this.j * this.w )+ this.w/2, this.w/2, this.w/2);
      }
      else
      {
        if(this.bombCount != 0)
        {
          textAlign(CENTER);
          fill(0);
          textSize();
          text(this.bombCount, this.i * this.w + this.w/2, this.j*this.w + this.w/2);
        }
      }
    }
    else
    {
      strokeWeight(2);
      noFill();
      rect(this.i * this.w, this.j * this.w, this.w, this.w);
    }
  }

  this.countBombs = function()
  {

    for(var y = -1; y <= 1; y++)
    {
      for(var x = -1; x <= 1; x++)
      {
        if(x + this.i > -1 && y + this.j > - 1 && x + this.i < cols && y +this.j < rows)
        {
          if(grid[x+this.i][y+this.j].bomb)
          {
            this.bombCount++;
          }
        }
      }
    }
  }

  this.floodFill = function()
  {
      for(var y = -1; y <= 1; y++)
      {
        for(var x = -1; x <= 1; x++)
        {
          if(x + this.i > -1 && y + this.j > - 1 && x + this.i < cols && y +this.j < rows)
          {
            if(!grid[x+this.i][y+this.j].bomb && !grid[x+this.i][y+this.j].revealed)
            {
              grid[x+this.i][y+this.j].revealed = true;
              if(grid[x+this.i][y+this.j].bombCount == 0)
              {
                grid[x+this.i][y+this.j].floodFill();
              }
            }
          }
        }
      }
  }


}
