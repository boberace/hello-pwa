window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

    var gateway = `ws://192.168.0.188:80/ws`;
    var websocket;
    function initWebSocket() {
        console.log('Trying to open a WebSocket connection...');
        websocket = new WebSocket(gateway);
        websocket.onopen    = onOpen;
        websocket.onclose   = onClose;
        websocket.onmessage = onMessage; // <-- add this line
    }
    function onOpen(event) {
        console.log('Connection opened');
        websocket.send('getLedState');
    }

    function onClose(event) {
        console.log('Connection closed');
        setTimeout(initWebSocket, 2000);
    }
    function onMessage(event) {
        var state;
        if (event.data == "1"){
        state = "ON";
        document.getElementById('state').innerHTML = state;
        }
        else if (event.data == "0"){
        state = "OFF";
        document.getElementById('state').innerHTML = state;
        }
        console.log(event.data);
    }
    window.addEventListener('load', onLoad);
    function onLoad(event) {
        initWebSocket();
        initButton();
    }

    function initButton() {
        document.getElementById('button').addEventListener('click', toggle);
    }
    function toggle(){
        websocket.send('toggle');
    }