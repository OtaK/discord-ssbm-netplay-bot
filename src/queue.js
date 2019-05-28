const _ = require('lodash');

class PlayerQueue {
    constructor() {
        this.inner = [];
    }

    pushPlayer(player) {
        this.inner.push(player);
    }

    randomPair() {
        const matches = _.chain(this.inner)
            .sortBy('rating')
            .sampleSize(2)
            .value();
    }
}

module.exports = PlayerQueue;
