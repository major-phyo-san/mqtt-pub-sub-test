const mqtt = require('mqtt');
const subClient = mqtt.connect('mqtt://178.128.16.62');

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