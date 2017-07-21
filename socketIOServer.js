var socketAuth = require('socketio-jwt-auth');
var config = require('./config.js');
var socketHelper = require('./socketHelper.js');

module.exports = function (server) {
    var io = require('socket.io')(server);
    var chatRoomMessages = socketHelper.initialiseChatRooms();

    io.use(socketAuth.authenticate({
        secret: config.secretKey,
        algorithm: 'HS256'
    }, function (payload, done){
        console.log('okay.');
        done(null, payload.allowedRooms);
    }));

/*, function (payload, next){
        console.log(payload);
        next(null, true);
    })*/

    io.on('connection', function (socket) {
        var allowedRooms = socket.request.user;
        console.log('............................im in here.......................');

        socket.on('newlyAdded', function (userName) {
            socket.emit('update', chatRoomMessages);
        })

        socket.on('chat message', function (msg) {
            var chatRoom = msg.chatRoom;
            if(socketHelper.isChatRoomValid())
            console.log('................saving message supposedly........................\n' + msg);
            messages.push(msg);
            socket.broadcast.emit('newAddition', msg);
            console.log('updated messages sent to the client.');
        });

    });

    return io;
}