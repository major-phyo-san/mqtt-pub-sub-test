const mqtt = require('mqtt');
const pubClient = mqtt.connect('mqtt://localhost');

pubClient.on('connect', function(){
    pubClient.publish('connection/start', 'Connection established');
    setInterval(publishMessages, 3000);
});

function publishMessages(){
    spo2 = publishBreathingSpo2();
    publishBreathingPao2();
    publishBreathingGraph(spo2);
    publishHeartRate();
    publishBloodPressureSystolic();
    publishBloodPressureDiastolic();
    publishTemperatureBody();
    publishTemperatureCore();
}

function publishBreathingSpo2(){
    spo2 = getRandomIntBetween(60, 100).toString();
    options = {
        qos: 0,
        retain: false,
        dup: false,
        properties: {
            payloadFormatIndicator: true,
            messageExpiryInterval: 6,
            contentType: 'text/plain',
            subscriptionIdentifier: 499382,
        }        
    }
    pubClient.publish('measurements/breathing/spo2', spo2, options);
    console.log('publishing SpO2 ' + spo2);
    spo2 = Number(spo2);
    return spo2;
}

function publishBreathingPao2(){
    pao2 = getRandomIntBetween(75, 100).toString();    
    pubClient.publish('measurements/breathing/pao2', pao2);
    console.log('publishing PaO2 ' + pao2);
}

function publishBreathingGraph(spo2){
    graphPoint = Math.sin(spo2).toFixed(6);
    pubClient.publish('measurements/breathing/graph', graphPoint);
    console.log('publishing breathing graph ' + graphPoint);
}

function publishHeartRate(){
    bpm = getRandomIntBetween(60, 80).toString();
    pubClient.publish('measurements/heartbeat/bpm', bpm);
    console.log('publishing heart rate ' + bpm);
}

function publishBloodPressureSystolic(){
    mmHgSys = getRandomIntBetween(110, 130).toString();
    pubClient.publish('measurements/bloodpressure/systolic', mmHgSys);
    console.log('publishing systolic pressure ' + mmHgSys);
}

function publishBloodPressureDiastolic(){
    mmHgDia = getRandomIntBetween(70, 90).toString();
    pubClient.publish('measurements/bloodpressure/diastolic', mmHgDia);
    console.log('publishing diastolic pressure ' + mmHgDia);
}

function publishTemperatureBody(){
    tempBody = getRandomArBetween(15, 40);
    tempBody = tempBody.toFixed(3);
    pubClient.publish('measurements/temperature/body', tempBody);
    console.log('publishing body temperature ' + tempBody);
}

function publishTemperatureCore(){
    tempCore = getRandomArBetween(36.5, 37.5);
    tempCore = tempCore.toFixed(3);
    pubClient.publish('measurements/temperature/core', tempCore);
    console.log('publishing core body temperature ' + tempCore);
}

function getRandomArBetween(min, max) {
    return Math.random() * (max - min) + min;    
}

function getRandomIntBetween(minInt, maxInt){
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;    
}