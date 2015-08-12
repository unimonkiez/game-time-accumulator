describe("GameTimeAccumulator", function() {
    var GameTimeAccumulator = require('../../dist/game-time-accumulator');

    it("should be a class", function() {
        expect(typeof GameTimeAccumulator).toEqual('function');
    });
    describe("creates an object", function() {
        var game;
        var counterStep = 0;
        var counterDraw = 0;

        beforeAll(function() {
            game = new GameTimeAccumulator(function() {
                counterStep++;
            }, function() {
                counterDraw++;
                //console.log(text);
            }, 500);
        });

        it("that has type object", function() {
            expect(game).toBeDefined();
            expect(typeof game).toEqual('object');
        });
        it("that has start function", function() {
            expect(game.start).toBeDefined();
            expect(typeof game.start).toEqual('function');
        });
        it("that has stop function", function() {
            expect(game.stop).toBeDefined();
            expect(typeof game.stop).toEqual('function');
        });
        describe("of a game that starts", function() {

            beforeAll(function(done) {
                game.start();
                setTimeout(done, 2000);
            });

            it("and runs stepFn in the time given", function() {
                // Runs every half a second and gave it 2 seconds to run, needs to be 4
                expect(counterStep).toBeBetween(3, 5);
            });
            it("and runs drawFn around 60 time in a second", function() {
                // Runs every ~16ms and gave it 2 seconds to run, needs to be ~120
                expect(counterDraw).toBeBetween(100, 140);
            });
            describe("and stops", function() {
                var counterStepNow;
                var counterDrawNow;

                beforeAll(function(done) {
                    game.stop();
                    counterStepNow = counterStep;
                    counterDrawNow = counterDraw;
                    setTimeout(done, 1000);
                });

                it("and runs stepFn in the time given", function() {
                    // Stopped, should stay the same after a second
                    expect(counterStep).toEqual(counterStepNow, counterStepNow);
                });
                it("and runs drawFn around 60 time in a second", function() {
                    // Stopped, should stay the same after a second
                    expect(counterDraw).toEqual(counterDrawNow, counterDrawNow);
                });
            });
        });
    });
});
