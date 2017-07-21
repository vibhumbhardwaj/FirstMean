var adapter = require('./mongoadapter.js');

initialiseChatRooms = function () {
    var chatRoomMessages = [];
    adapter.getChatRooms(function (err, chatRooms){
        if(!err)
            chatRooms.forEach(function (room) {
                chatRoomMessages.push({ chatRoom: room.chatRoom, messages: [], showPrevious: room.showPrevious });
            }, this);
    });

    return chatRoomMessages;
}

getChatRoom = function(chatRoom) {
    adapter.findChatRoom({chatRoom: chatRoom}, function(err, chatRoom){
        if(!err) return chatRoom;
    })
}


module.exports = {
    initialiseChatRooms: initialiseChatRooms
}