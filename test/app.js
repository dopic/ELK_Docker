var net = require('net');
var ip = require('ip');
var os = require('os');
var uuid = require('node-uuid');

var client = net.createConnection(5100, ()=>{

    console.log('Connected');

    let message = {
        id: uuid.v4(),
        correlationId: uuid.v4(),
        message: 'Connection Test',
        host: ip.address(),
        hostName: os.hostname(),
        os: os.type(),
        platform: os.platform()
    };

    let serializedMessage = JSON.stringify(message);

    console.log(`Message: ${serializedMessage}`);
    client.write(serializedMessage);

    console.log('Message sent');
    client.end();
})
    .on('data', (data) => {
        console.log(data);
    })
    .on('error', (error) =>{
        console.log(`Error: ${error}`)
    })
    .on('end', () =>{
        console.log('Disconnected')
    });


