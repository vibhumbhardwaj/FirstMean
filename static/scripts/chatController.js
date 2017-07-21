app.controller('chatController', function ($rootScope, $scope) {

    $scope.messages = [];
    var chatRoom = location.href.split("/").pop();
    $scope.userName = $rootScope.getNameForChat(chatRoom);

    var socket = io.connect({ query: 'auth_token=' + window.localStorage.chatToken });
    socket.emit('newlyAdded', $scope.userName);
    /**initialisation complete.**/


    $scope.send = function () {
        if ($scope.msg.message) {
            $scope.msg.chatRoom = chatRoom;
            $scope.msg.userName = $scope.userName;
            socket.emit('chat message', $scope.msg);
            $scope.messages.push($scope.msg);
            $scope.message = "";
        }
    }
    socket.on('chat message', function (msg) {
        /*  var li = document.createElement("li");
          li.appendChild(document.createTextNode(msg));
          document.getElementById("messages").appendChild(li);*/
        console.log('message received.');
    });

    socket.on('newAddition', function (msg) {
        $scope.messages.push(msg);
        $scope.$apply();
        if ($scope.notificationEnabled)
            window.alert('new Message!');
    });

    socket.on('update', function (msgs) {
        $scope.messages = msgs;
        $scope.$apply();
    });
});