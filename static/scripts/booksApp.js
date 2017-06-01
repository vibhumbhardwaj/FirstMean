var app = angular.module('booksApp',[]);

app.run(function($rootScope, $http){

    $rootScope.http = $http;

    $rootScope.dummySendRequest = function(){
   /*     if(window.localStorage.token)
            $rootScope.http.defaults.headers.common.Authorization = window.localStorage.token;   */     
        console.log('sending the secure request.');
        $rootScope.http({
            method: 'POST',
            url: '/site/gateway/secure/iLikeThis',
            datatype: 'json',
             headers: {
                'Content-Type' : 'application/json'
            }         

        }).then(function success(res){
            console.log('o ya.\n' + res);
        }, function failure(err){
            console.log('shit happened ' + err);
        })
    }
})