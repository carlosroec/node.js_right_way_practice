'use strict';

const netClient = require('net').connect({port: 60300});
const ldjClient = require('./lib/ldj-client.js').connect(netClient);

ldjClient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        console.log(`File changed: ${new Date(message.timestamp)}`);
    } else {
        throw Error(`Unrecognized message type: ${message.type}`);
    }
});

// const net = require('net');
// const client = net.connect({port: 60300});

// client.on('data', data => {
//     const message = JSON.parse(data);

//     if (message.type === 'watching') {
//         console.log(`Now watching: ${message.file}`);
//     } else if (message.type === 'changed') {
//         const date = new Date(message.timestamp);
//         console.log(`File changed: ${date}`);
//     } else {
//         console.log(`Unrecognized message type: ${message.type}`);
//     }
// });
