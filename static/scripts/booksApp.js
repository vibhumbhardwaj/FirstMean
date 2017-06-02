var app = angular.module('booksApp',[]);

app.run(function($rootScope, $http){

    $rootScope.http = $http;
    $rootScope.http.defaults.headers.post['Authorization'] = window.localStorage.token;
    //$rootScope.token = "";
    $rootScope.setHeader = function(){
        console.log('[INFO] setting up the headers, at least trying to!')
        if (window.localStorage.token)
            $rootScope.http.defaults.headers.common.Authorization = window.localStorage.token;
    }
    $rootScope.logoutUser = function(){
        window.localStorage.removeItem('token');
        $rootScope.http.defaults.headers.common = {};
        console.log('signed out.');        
    }
        
    $rootScope.dummySendRequest = function(){
   /*     if(window.localStorage.token)
            $rootScope.http.defaults.headers.common.Authorization = window.localStorage.token;   */     
        console.log('sending the secure request. with token: ' + window.localStorage.token);
      //  $rootScope.setHeader();
        $rootScope.http({
            method: 'POST',
            url: '/site/gateway/secure/iLikeThis',
            datatype: 'json',
             headers: {
                'Content-Type' : 'application/json'
            }         

        }).then(function success(res){
            if(res.data.success)
                console.log('o ya. baby.');
            else
                console.log('oh no.');    
        }, function failure(err){
            console.log('shit happened ' + err);
        })
    }
})