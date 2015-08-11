export default class GameTimeAccumulator {
    constructor(stepFn = function() {}, drawFn = function() {}, stepSize = 60) {
        // Check parameters and throw detailed Error if invalid
        if (typeof stepFn !== 'function') {
            throw new Error(`Game.constructor(): Second arg, stepFn, must be a Function, got ${typeof stepFn}.`);
        }
        if (typeof drawFn !== 'function') {
            throw new Error(`Game.constructor(): Third arg, drawFn, must be a Function, got ${typeof drawFn}.`);
        }
        if (typeof stepSize !== 'number') {
            throw new Error(`Game.constructor(): Fourth arg, stepSize, must be a Number, got ${typeof stepSize}.`);
        }
        // Parameters properties
        this.stepFn = stepFn;
        this.drawFn = drawFn;
        this.stepSize = stepSize;

        // Default properties
        this.time = undefined;
        this.accumulator = 0.0;
    }

    tickFn(time) {
        // requestAnimationFrame's callback gives a very high resolution
        // timestamp (DOMHighResTimeStamp) as an argument. The timestamp
        // is accurate to a microsecond so we no longer need, nor want to
        // call Date.now as it is only accurate to the millisecond.

        // On the first tick delta time should be 0.
        let deltaTime = time - (this.time || time);
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
    start() {
        requestAnimationFrame(this.tickFn.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.tickFn.bind(this));
    }
}

'use strict';
