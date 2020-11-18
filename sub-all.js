const mqtt = require('mqtt');
const subClient = mqtt.connect('mqtt://localhost');

subClient.on('connect', function(){    
    subClient.subscribe('measurements/breathing/spo2');
    subClient.subscribe('measurements/breathing/pao2');
    subClient.subscribe('measurements/breathing/graph');

    subClient.subscribe('measurements/heartbeat/bpm');

    subClient.subscribe('measurements/bloodpressure/systolic');
    subClient.subscribe('measurements/bloodpressure/diastolic');

    subClient.subscribe('measurements/temperature/body');
    subClient.subscribe('measurements/temperature/core');

});

subClient.on('message', function(topic, message){
    tpc = topic;
    msg = message.toString();
    console.log('topic ' + tpc);
    console.log('message ' + msg);
    // switch(topic){
    //     case '' : 
    //     handleConnectionStart(topic, message);
    //     break;
    //     default : 
    //     console.log('unknow');
    // }
});

function handleConnectionStart(topic, message){
    console.log('Connection established');
}