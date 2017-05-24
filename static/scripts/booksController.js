//var app = angular.module('booksApp',[]);
app.controller('booksController', function($scope, $http){
    $scope.bookstodisplay;
    $scope.numberofbooks = 10;
    $http({
        method: 'GET',
        url: '/gateway/getBooks?v=' + $scope.numberofbooks,
        datatype: 'json',
    }).then(function success(res){
        $scope.bookstodisplay = res;
    }, function failure(err){
        console.log('shit happens');
    })
})