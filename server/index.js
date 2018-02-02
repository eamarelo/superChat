var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    socket.on('new_constumer', function(pseudo) {
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_constumer', pseudo);
    });
    console.log(socket.pseudo);
    socket.on('message', function (message, pseudo) {
        socket.broadcast.emit('message', {pseudo: pseudo, message: message});
    }); 
});

server.listen(8080);