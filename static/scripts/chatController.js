app.controller('chatController', function ($rootScope, $scope) {

    $scope.messages = []

    var socket = io.connect();
    $scope.send = function () {
        if($scope.message)
            socket.emit('chat message', $scope.message);
        $scope.messages.push($scope.message);
        $scope.message = "";
    }
    socket.on('chat message', function (msg) {
      /*  var li = document.createElement("li");
        li.appendChild(document.createTextNode(msg));
        document.getElementById("messages").appendChild(li);*/
        console.log('message received.');
    });

    socket.on('newAddition', function(msg) {
        $scope.messages.push(msg);
        $scope.$apply();
        if($scope.notificationEnabled)
            window.alert('new Message!');
    })

    socket.on('update', function(msgs) {
        $scope.messages = msgs;
        $scope.$apply();
    });
});