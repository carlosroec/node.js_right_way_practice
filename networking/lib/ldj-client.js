const EventEmitter = require('events').EventEmitter;

// prototypal inheritance
// const EventEmitter = requrie('events').EventEmitter;
// const util = require('util');

// function LDJClient(stream) {
//     EventEmitter.call(this);

// }

// util.inherits(LDJClient, EventEmitter);

class LDJClient extends EventEmitter {
    constructor(stream) {
        super();

        let buffer = '';

        stream.on('data', data => {
            buffer += data;

            let boundary = buffer.indexOf('\n');

            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);

                buffer = buffer.substring(boundary + 1);

                this.emit('message', JSON.parse(input));

                boundary = buffer.indexOf('\n');
            }
        });
    }

    static connect(stream) {
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;
