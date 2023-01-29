window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}


var connection = new WebSocket(wsServer, ['arduino']);
connection.onopen = function () {  
    connection.send('Connect ' + new Date()); 
}; 
connection.onerror = function (error) {    
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {  
    console.log('Server: ', e.data);
};
function sendRGB() {  
    var r = parseInt(document.getElementById('r').value).toString(16);  
    var g = parseInt(document.getElementById('g').value).toString(16);  
    var b = parseInt(document.getElementById('b').value).toString(16);  
    if(r.length < 2) { r = '0' + r; }   
    if(g.length < 2) { g = '0' + g; }   
    if(b.length < 2) { b = '0' + b; }   
    var rgb = '#'+r+g+b;    
    console.log('RGB: ' + rgb); connection.send(rgb); 
}
