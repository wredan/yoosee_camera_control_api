// <ip>  <UP|DWON|LEFT|RIGHT>
// .. and yes it is DWON not DOWN :)

const net = require('net');

module.exports = function moveTo(ip, action) {
    var client = new net.Socket();
    client.connect(554,ip, function() {
        console.log('Connected');
        client.write("SETUP rtsp://"+ip+"/onvif1/track1 RTSP/1.0\r\n"+
                                    "CSeq: 1\r\n"+
                                    "User-Agent: LibVLC/2.2.6 (LIVE555 Streaming Media v2016.02.22)\r\n"+
                                    "Transport: RTP/AVP/TCP;unicast;interleaved=0-1\r\n\r\n");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.write("SET_PARAMETER rtsp://"+ip+"/onvif1 RTSP/1.0\r\n"+
                                    "Content-type: ptzCmd: "+action+"\r\n"+
                                    "CSeq: 2\r\n"+
                                    "Session:\r\n\r\n");
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}