app.controller('chatController', function ($rootScope, $scope) {
    $scope.authorised = true;
    $scope.messages = [];
    var chatRoom = location.href.split("/").pop();
    $scope.userName = $rootScope.getNameForChat(chatRoom);

    var socket = io({ query: "auth_token=" + window.localStorage.chatToken + "&chatRoom=" + chatRoom, forceNew: true });
    //socket.emit('newlyAdded', chatRoom);
    /**initialisation complete.**/


    $scope.send = function () {
        if ($scope.currentMessage) {
            var msg = {
                message: $scope.currentMessage,
                chatRoom: chatRoom,
                userName: $scope.userName
            }
            socket.emit('chat message', msg);
            $scope.messages.push(msg);
            $scope.currentMessage = "";
        }
    }


    socket.on('newMessage', function (msg) {
        $scope.messages.push(msg);
        $scope.$apply();
        if ($scope.notificationEnabled)
            window.alert('new Message!');
    });

    socket.on('unauthorised', function(err){
       $scope.authorised = false;
       document.getElementById('errorMessage').innerHTML = err;
       $scope.$apply(); 
    });

    socket.on('previousMessages', function (msg) {
        //msg.chatRoom
        $scope.messages = msg.messages;
        $scope.$apply();
    });
});