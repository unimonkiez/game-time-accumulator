# game-time-accumulator
A great class to manage updates to your own game using time accumulator principle.

### Install
```npm install game-time-accumulator```.

### Use
```
var GameTimeAccumulator = require('game-time-accumulator');

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

// Happens exactly in a loop you define
var stepFn = function(){
  player.move();
}

// Happen every requestAnimationFrame
var drawFn = function(){
  // Clear canvas before each fraw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
}

var game = new GameTimeAccumulator(stepFn, drawFn);
game.start();

```

### Parameters
**stepFn** - (Function, default noop) - Run every step loop (you define the time)

**drawFn** - (Function, default noop) - Run every requestAnimationFrame loop (system defines the time)

**stepSize** - (Number, default 16 - ~60fps) - Milliseconds of step to loop

## Functions
```start()``` - Start the game

```stop()``` - Start the game