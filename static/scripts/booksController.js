//var app = angular.module('booksApp',[]);
app.controller('booksController', function ($scope, $http) {
    $scope.bookstodisplay;
    $scope.numberofbooks = 10;
    $scope.search;

    $scope.hitIt = function () {
        $scope.querysearch = ($scope.search) ? '&q='+ $scope.search : '';
        $http({
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
})