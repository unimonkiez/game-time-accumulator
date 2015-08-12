beforeEach(function() {
    jasmine.addMatchers({
        toBeBetween: function() {
            return {
                compare: function(actual, min, max) {
                    return {
                        pass: typeof actual === 'number' && actual >= min && actual <= max,
                        message: 'Expected ' + actual + ' to be between ' + min +' and ' + max + '.'
                    }
                }
            };
        }
    });
});
