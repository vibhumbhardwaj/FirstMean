app.controller('bookdetailController', function($rootScope, $scope){
    $scope.book = {
        issued: false,
        issuedTo: "Please Wait...",
        issuedToCurrent: false,
        book: "Please Wait...",
        points: 0,
    }

});