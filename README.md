# kurento-rtmp #

Here is a simple demo which can provide a pipeline from kurento-webrtc to rtmp server (eg., srs, nginx-rtmp-module, etc.).

You can browse https://1029.mythkast.net to test this demo.

![image](https://github.com/godka/kurento-rtmp/raw/master/img/rtp.png)

The pipeline of the work is described as follows:

```
[Browser] -> WebrtcEndpoint -> [Kurento] -> RtpEndpoint -> 
[FFmpeg] -> RTMP -> [Node_Media_Server(srs)] -> RTMP -> [Browser]
```

## Build ##

```
1.install node && npm
2.git clone https://github.com/godka/kurento-rtmp
3.cd kurento-rtmp
4.npm install
5.node server.js
6.Open https://yourhost on Chrome or Firefox
7.Click Start button and have fun!
```

## Notation ##

Before running this demo,you must have build *FFmpeg* and *Kurento Media Server* on your server.

## Licensing and distribution ##

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
