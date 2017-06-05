//var app = angular.module('booksApp',[]);
app.controller('booksController', function ($rootScope, $scope) {
    $scope.bookstodisplay;
    $scope.numberofbooks = 10;
    $scope.search;

    $scope.createBookLink = function(bookId){
        window.open('books/'+ bookId);
    }

    $scope.hitIt = function () {
        $scope.querysearch = ($scope.search) ? '&q='+ $scope.search : '';
        $rootScope.http({
            method: 'GET',
            url: '/site/gateway/getBooks?v=' + $scope.numberofbooks + $scope.querysearch,
            datatype: 'json',
        }).then(function success(res) {
            $scope.bookstodisplay = res;
            
        }, function failure(err) {
            console.log('shit happened at API');
            $scope.error = true;
        })
        
    }
    $scope.hitIt();
    //$rootScope.dummySendRequest();

    
})