/**
 * Created by Krishna on 2/28/14.
 */

var app = angular.module('MediBillAngularApp',['MediBillAngularApp.directives', 'MediBillAngularApp.services']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        controller : 'listController',
        resolve : {
            bills : ['MultiBillLoader', function(MutliBillLoader){
                        return new MutliBillLoader();
                    }]
        },
        templateUrl : 'views/list.html'
    }).when('/view/:bill_id', {
        controller: 'billController',
        resolve : {
            bill : ['BillLoader', function(BillLoader){
                return new BillLoader();
            }]
        },
        templateUrl: 'views/bill.html'
    }).when('/edit/:bill_id', {
        controller : 'editController',
        templateUrl : 'views/billForm.html'
    }).when('/new' ,{
        controller : 'newController',
        templateUrl : 'views/billForm.html'
    }).otherwise({redirectTo: '/'});
}]);

app.controller('listController', ['$scope', 'bills', function($scope, bills){
    $scope.bills = bills;
}]);

app.controller('billController', ['$scope', '$location', 'bill', 'PersistentService', function($scope, $location, bill, PersistentService){
    $scope.bill = bill;

    $scope.edit = function(){
        PersistentService.setBill(bill);
        $location.path('/edit/'+$scope.bill._id);
    };

    $scope.delete = function(){
        $scope.bill.$delete(function(bill){
            $location.path('/');
        });
    };
}]);

app.controller('editController', ['$scope', '$location', 'PersistentService', function($scope, $location, PersistentService){
    $scope.bill = PersistentService.getBill();

    $scope.save = function(){
        $scope.bill.$save(function(bill){
            console.log("return bill" );
            console.log(bill);
            $location.path('/view/'+ bill._id);
        });
      console.log($scope.bill);
    };
}]);

app.controller('newController', ['$scope', '$location', 'Bill', function($scope, $location, Bill){
    $scope.bill = new Bill({
        items : [{}]
    });

    $scope.save = function(){
        $scope.bill.$save(function(bill){
            $location.path('/view/'+ bill._id);
        });
        console.log($scope.bill);
    };
}]);