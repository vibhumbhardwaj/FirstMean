var app = angular.module('booksApp', []);

app.run(function ($rootScope, $http) {
    $rootScope.http = $http;
    $rootScope.http.defaults.headers.post['Authorization'] = window.localStorage.token;
    //$rootScope.token = "";
    $rootScope.setHeader = function () {
        console.log('[INFO] setting up the headers, at least trying to!')
        if (window.localStorage.token)
            $rootScope.http.defaults.headers.common.Authorization = window.localStorage.token;
    }
    $rootScope.logoutUser = function () {
        window.localStorage.clear();
        $rootScope.http.defaults.headers.common = {};
        document.cookie = 'Authorization' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        console.log('signed out.');
    }

    $rootScope.getUserId = function(){
        token = parseJwt(window.localStorage.token);
        return token.userId;
    }

    $rootScope.getUserName = function(){
        token = parseJwt(window.localStorage.token);
        return token.userName;
    }

    $rootScope.isAdmin = function(){
        token = parseJwt(window.localStorage.token);
        return token.admin;
    }

    var parseJwt = function (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    $rootScope.dummySendRequest = function () {
        /*     if(window.localStorage.token)
                 $rootScope.http.defaults.headers.common.Authorization = window.localStorage.token;   */
        console.log('sending the secure request. with token: ' + window.localStorage.token);
        //  $rootScope.setHeader();
        $rootScope.http({
            method: 'POST',
            url: '/site/gateway/secure/iLikeThis',
            datatype: 'json',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(res) {
            if (res.data.success)
                console.log('o ya. baby.');
            else
                console.log('oh no.');
        }, function failure(err) {
            console.log('shit happened ' + err);
        })
    }
})