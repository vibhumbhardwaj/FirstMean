app.controller('chatController', function ($rootScope, $scope, $window) {
    $scope.authorised = true;
    $scope.messages = [];
    var chatRoom = location.href.split("/").pop();
    var primaryIndex;
    $scope.userName = $rootScope.getNameForChat(chatRoom);


    //var socketPrimary = io({ 'chatRoom': chatRoom, query: "auth_token=" + window.localStorage.chatToken + "&chatRoom=" + chatRoom, forceNew: true });
    //socketPrimary.emit('newlyAdded', chatRoom);
    /**initialisation complete.**/
    var socketArray = [];

    $scope.allowedRooms = $rootScope.getAllowedRooms();
    $scope.allowedRooms.forEach(function (room, index){
        if(room.chatRoom == chatRoom)
            primaryIndex = index;
        socketArray.push( {index: index, chatRoom: room.chatRoom, socket: io({ query: "auth_token=" + window.localStorage.chatToken + "&chatRoom=" + room.chatRoom, forceNew: true }) });
    });

    socketArray.forEach(function(socketObject){
        socketObject.socket.on('newMessage', function(msg){
            console.log('new message in ' + socketObject.chatRoom + ' --> ' + msg.message);
            if(socketObject.index != primaryIndex){
                $scope.allowedRooms[socketObject.index].count ++;
                $scope.$apply();
                document.getElementById('chatSideBar').style.display = 'none';
                document.getElementById('chatSideBar').style.display = 'block';
            }
        });
    });

    $scope.toggleSideBar = function(){
        var sidebar = document.getElementById('chatSideBar');
        if(sidebar.style.display == 'none')
            sidebar.style.display = 'block';
        else
            sidebar.style.display = 'none';
    }

    $scope.send = function () {
        if ($scope.currentMessage) {
            var msg = {
                message: $scope.currentMessage,
                chatRoom: chatRoom,
                userName: $scope.userName
            }
            socketArray[primaryIndex].socket.emit('chat message', msg);
            $scope.messages.push(msg);
            $scope.currentMessage = "";
        }
    }


    socketArray[primaryIndex].socket.on('newMessage', function (msg) {
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

    socketArray[primaryIndex].socket.on('unauthorised', function(err){
       $scope.authorised = false;
       document.getElementById('errorMessage').innerHTML = err;
       $scope.$apply(); 
    });

    socketArray[primaryIndex].socket.on('previousMessages', function (msg) {
        //msg.chatRoom
        $scope.messages = msg.messages;
        $scope.messages.push({userName: '', message: '::::::::::::::::::::::::::::::::::  Previous Messages >>>'});
        $scope.$apply();
    });

    $window.onfocus = function(){
        delete $scope.alertCount;
    }
});