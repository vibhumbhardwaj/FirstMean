//var app = angular.module('booksApp',[]);
app.controller('booksController', function($scope, $http){
    $scope.bookstodisplay;
    $scope.numberofbooks = 10;
    //$scope.bookurl 

    $http({
        method: 'GET',
        url: '/gateway/books/getBooks?v=' + $scope.numberofbooks,
        datatype: 'json',
    }).then(function success(res){
        $scope.bookstodisplay = res.data;
    }, function failure(err){
        console.log('shit happens');
    })

})