const mqtt = require('mqtt');
const subClient = mqtt.connect('mqtt://localhost');

var count = 0;

subClient.on('connect', function(){
    console.log('connection started....');
    subClient.subscribe('connection/start');
    subClient.subscribe('measurements/breathing/spo2');
    subClient.subscribe('measurements/breathing/pao2');
    subClient.subscribe('measurements/breathing/graph');
});

subClient.on('message', function(topic, message){
    if(count == 10){
        disconnect();
    }
    tpc = topic;
    msg = message.toString();
    console.log('topic ' + tpc);
    console.log('message ' + msg);
    console.log('running for ' + count + ' times');
    count += 1;
});

subClient.on('end', function(){
    console.log('ending connection.....');
})

subClient.on('offline', function(){
    console.log('I\'m offline');
});

function disconnect(){
    subClient.end();
}