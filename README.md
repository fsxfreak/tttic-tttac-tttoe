tttic-tttac-tttoe
=======
I got this game idea from a couple of friends back in high school. We don't know if a game can result in a tie, someone want to write a test for that?

The game takes approximately 30 minutes to complete, if played tactically.

## Rules
* Player 1 starts anywhere.
* The next player in turn must play in the micro-grid of the macro-grid determined by the location of the previous mark.
* A micro-grid is won once one player has a tic-tac-toe in that micro-grid.
* It is permissible to send a player to an already-won micro-grid.
* The game is won once one player has won three micro-grids in a row, column, or a diagonal of the macro-grid (a tttic-tttac-tttoe).

## Dependencies
##### Platform agnostic
* **[Two.js](https://github.com/jonobr1/two.js/)** - Used for drawing the game.
* **[jQuery v.2.1.4](https://jquery.com/)** - Used for capturing mouse clicks.

## Author's comments
I wanted to play around with 2D rendering with JS. I did not expect it to be so easy, with the help of Two.js. 

Although the coding was relatively easy, I found it tedious to encode win conditions, identify click areas for each box, and build the box using coordinate math. Perhaps in the future it'd be easier to store all this information in a custom image format to parse.
## Future plans

In the future, I'd like to make the game playable without reading the rules (i.e. highlight where the player can make their move next) and add UI elements that communicate useful aspects of the state to the players.

## License

The MIT License (MIT)

Copyright (c) 2015 Leon Cheung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
