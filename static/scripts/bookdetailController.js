app.controller('bookdetailController', function($rootScope, $scope){
    var bookId = location.href.split("/").pop();
    $scope.book = {
        issued: false,
        issuedTo: "Please Wait...",
        issuedToCurrent: false,
        book: "Please Wait...",
    }

    $scope.hitIt = function(){
        $rootScope.http({
            method: 'GET',
            url: '/site/gateway/books/' + bookId,
            datatype: 'json'
        }).then(function success(res){
            if(res.data.success)
                $scope.book = res.data.book;
        }, function failure(err){
            console.log('shit happened at API');
            $scope.error = true;
        })
    }

    $scope.hitIt();

    $scope.toggleUpvote = function(){
        $rootScope.http({
            url: '/site/gateway/secure/toggleUpvote',
            data: {book: $scope.book},
            datatype: 'json',
            method: 'POST'
        }).then(function success(yoman){
            $scope.hitIt();
        }, function failure(err){
            console.log(err);
        })
    }

});