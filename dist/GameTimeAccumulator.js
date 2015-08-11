'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var GameTimeAccumulator = (function () {
    function GameTimeAccumulator() {
        var stepFn = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
        var drawFn = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
        var stepSize = arguments.length <= 2 || arguments[2] === undefined ? 60 : arguments[2];

        _classCallCheck(this, GameTimeAccumulator);

        // Check parameters and throw detailed Error if invalid
        if (typeof stepFn !== 'function') {
            throw new Error('Game.constructor(): Second arg, stepFn, must be a Function, got ' + typeof stepFn + '.');
        }
        if (typeof drawFn !== 'function') {
            throw new Error('Game.constructor(): Third arg, drawFn, must be a Function, got ' + typeof drawFn + '.');
        }
        if (typeof stepSize !== 'number') {
            throw new Error('Game.constructor(): Fourth arg, stepSize, must be a Number, got ' + typeof stepSize + '.');
        }
        // Parameters properties
        this.stepFn = stepFn;
        this.drawFn = drawFn;
        this.stepSize = stepSize;

        // Default properties
        this.time = undefined;
        this.accumulator = 0.0;
    }

    _createClass(GameTimeAccumulator, [{
        key: 'tickFn',
        value: function tickFn(time) {
            // requestAnimationFrame's callback gives a very high resolution
            // timestamp (DOMHighResTimeStamp) as an argument. The timestamp
            // is accurate to a microsecond so we no longer need, nor want to
            // call Date.now as it is only accurate to the millisecond.

            // On the first tick delta time should be 0.
            var deltaTime = time - (this.time || time);
            this.time = time;
            // Add delta time to our accumulator, iterate over the steps we
            // can do, and carry the leftovers over to the next frame.
            this.accumulator += deltaTime;
            while (this.accumulator >= this.stepSize) {
                this.stepFn(this.stepSize);
                this.accumulator -= this.stepSize;
            }

            this.drawFn(deltaTime);
            // Request an animation frame to invoke tickFn again
            requestAnimationFrame(this.tickFn.bind(this));
        }
    }, {
        key: 'start',
        value: function start() {
            requestAnimationFrame(this.tickFn.bind(this));
        }
    }, {
        key: 'stop',
        value: function stop() {
            cancelAnimationFrame(this.tickFn.bind(this));
        }
    }]);

    return GameTimeAccumulator;
})();

exports['default'] = GameTimeAccumulator;

'use strict';
module.exports = exports['default'];