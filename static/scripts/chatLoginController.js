app.controller('chatLoginController', function ($rootScope, $scope) {
    $scope.private = false;
    var publicRoom = false;


    $scope.gotoPublic = function(){
        if(!$scope.userName)
            $scope.userName = prompt('And what would be your username?');
        $scope.chatRoom = 'public';
        publicRoom = true;
        $scope.getChatToken();
    }

    $scope.getChatToken = function () {
        var token = window.localStorage.chatToken;
        var datatosend;
        var url;
        if (!$scope.private || publicRoom) {
            if (($scope.chatRoom && $scope.password && $scope.userName) || (publicRoom && $scope.userName))
                datatosend = { chatRoom: $scope.chatRoom, password: $scope.password, userName: $scope.userName, token: token };
            url = '/site/gateway/authoriseChatAccess';
        }
        else {
            if ($scope.passwordRequired && $scope.chatRoom && $scope.password)
                datatosend = { chatRoom: $scope.chatRoom, password: $scope.password, token: token };
            else if (!$scope.passwordRequired && $scope.chatRoom)
                datatosend = { chatRoom: $scope.chatRoom, token: token };
            url = '/site/gateway/authoriseChatAccess';
        }

        if (datatosend)
            $rootScope.http({
                method: 'POST',
                url: url,
                datatype: 'json',
                data: datatosend
            }).then(function success(res) {
                if (res.data.success) {
                    window.localStorage.chatToken = res.data.token;
                    window.open('/site/chat/' + $scope.chatRoom, '_self');
                }
                else {
                    console.log('coudn\'t get the token for chat. sorry.');
                }
            }, function failure(err) {
                console.log('oh man!!');
            })
    }
});