app.controller('chatController', function ($rootScope, $scope, $window) {
    $scope.authorised = true;
    $scope.messages = [];
    var chatRoom = location.href.split("/").pop();
    $scope.userName = $rootScope.getNameForChat(chatRoom);


    var socketPrimary = io({ query: "auth_token=" + window.localStorage.chatToken + "&chatRoom=" + chatRoom, forceNew: true });
    //socketPrimary.emit('newlyAdded', chatRoom);
    /**initialisation complete.**/
    var socketArray = [];

    $scope.allowedRooms = $rootScope.getAllowedRooms();
    allowedRooms.forEach(function (room){
        socketArray.push( io({ query: "auth_token=" + window.localStorage.chatToken + "&chatRoom=" + room.chatRoom, forceNew: true }) );
    });

    socketArray.forEach(function(socket){
        socket.on('newMessage', function(msg){
            // do stuff here like adding *s alongside their names or whatever
        })
    });

    $scope.send = function () {
        if ($scope.currentMessage) {
            var msg = {
                message: $scope.currentMessage,
                chatRoom: chatRoom,
                userName: $scope.userName
            }
            socketPrimary.emit('chat message', msg);
            $scope.messages.push(msg);
            $scope.currentMessage = "";
        }
    }


    socketPrimary.on('newMessage', function (msg) {
        $scope.messages.push(msg);
        $scope.$apply();

        if(!document.hasFocus())
            if($scope.alertCount)
                $scope.alertCount++;
            else
                $scope.alertCount = 1;

        if ($scope.notificationEnabled)
            window.alert('new Message!');
    });

    socketPrimary.on('unauthorised', function(err){
       $scope.authorised = false;
       document.getElementById('errorMessage').innerHTML = err;
       $scope.$apply(); 
    });

    socketPrimary.on('previousMessages', function (msg) {
        //msg.chatRoom
        $scope.messages = msg.messages;
        $scope.messages.push({userName: '', message: '::::::::::::::::::::::::::::::::::  New Messages >>>'});
        $scope.$apply();
    });

    $window.onfocus = function(){
        delete $scope.alertCount;
    }
});