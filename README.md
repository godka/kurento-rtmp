# kurento-rtmp #

Here is a simple sample which can provide a pipeline from kurento-webrtc to rtmp server(srs,nginx-rtmp-module).
The pipeline is probably like this:

```
browser -> WebrtcEndpoint -> [Kurento] -> RtpEndpoint -> [FFmpeg] -> RTMP -> [Node_Media_Server(srs)] -> RTMP -> browser
```

## Build ##

>1.install node && npm
>2.git clone https://github.com/godka/kurento-rtmp
>3.cd kurento-rtmp
>4.npm install
>5.node server.js
>6.Open https://yourhost:8443 on Chrome or Firefox
>7.Click Start button and have fun!

## Caution ##

Before running this sample,you must have build FFmpeg and Kurento Media Server on your server.
