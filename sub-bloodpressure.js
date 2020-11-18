const mqtt = require('mqtt');
const subClient = mqtt.connect('mqtt://localhost');

subClient.on('connect', function(){
    subClient.subscribe('measurements/bloodpressure/systolic');
    subClient.subscribe('measurements/bloodpressure/diastolic');
});

subClient.on('message', function(topic, message){
    tpc = topic;
    msg = message.toString();
    console.log('topic ' + tpc);
    console.log('message ' + msg);   
});