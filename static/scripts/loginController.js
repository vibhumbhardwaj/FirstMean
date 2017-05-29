app.controller('loginController', function($scope,$http){
    $scope.username = "";
    $scope.password = "";

    $scope.loginUser = function(){
        if(!checkIfUserGood()) return;
        datatosend = {username: $scope.username, password: $scope.password};
        $http({
            method: 'POST',
            url: '/site/gateway/authenticate',
            datatype: 'json',
            data: datatosend,
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(function success(res) {
            console.log(res);
            if(res.data.success){
                window.location = "http://www.google.com";
            }
        }, function failure(err) {
            console.log('shit happened at API');
            $scope.error = true;
        })

    }

    checkIfUserGood = function(){
        return true;
    }

})