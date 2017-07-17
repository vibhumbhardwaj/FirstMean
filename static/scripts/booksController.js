//var app = angular.module('booksApp',[]);
app.controller('booksController', function ($rootScope, $scope) {
    $scope.bookstodisplay;
    $scope.numberofbooks = 10;
    $scope.search;

    $scope.createBookLink = function(bookId){
        window.open('books/'+ bookId);
    }

    $scope.getImageSource = function(bookId) {
        return '/images/abc.jpg';
    }

    $scope.toggleSearchBar = function() {
        var searchBox = document.getElementById('searchBox');

        if(searchBox.style.display == 'none')
            searchBox.style.display = 'inline';
        else
            searchBox.style.display = 'none';
    }

    $scope.hitIt = function () {
        $scope.querysearch = ($scope.search) ? '&q='+ $scope.search : '';
        $rootScope.http({
            method: 'GET',
            url: '/site/gateway/getBooks?v=' + $scope.numberofbooks + $scope.querysearch,
            datatype: 'json',
        }).then(function success(res) {
            console.log(res.data);
            $scope.bookstodisplay = res.data.books;
        }, function failure(err) {
            console.log('shit happened at API');
            $scope.error = true;
        })
        
    }
    $scope.hitIt();
    //$rootScope.dummySendRequest();

    
})