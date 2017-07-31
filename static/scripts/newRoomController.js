app.controller('newRoomController', function($rootScope, $scope){

    var socket = io('/chatAuthorisation');
    $scope.showPrevious = true

    $scope.findAvailability = function(){
        if($scope.chatRoom)
            socket.emit('findAvailability', $scope.chatRoom);
        else
            $scope.available = false;
    }

    socket.on('availabilityResult', function(isAvailable){
        $scope.called = true;
        if(isAvailable)
            $scope.available = true;
        else
            $scope.available = false;
        $scope.$apply();
    });
})