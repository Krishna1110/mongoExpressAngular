/**
 * Created by Krishna on 3/2/14.
 */
"use strict";

var services = angular.module('MediBillAngularApp.services', ['ngResource']);

services.factory('Bill', ['$resource', function($resource){
    return $resource('/bill/:id', {id:'@_id'});
}]);

services.factory('MultiBillLoader', ['$q', 'Bill', function($q, Bill){

    return function(){
        var deffered = $q.defer();
        Bill.query(function(bills){
            deffered.resolve(bills);
        }, function(){
            deffered.reject();
        });

        return deffered.promise;
    };
}]);

services.factory('BillLoader', ['$q', '$route', 'Bill', function($q, $route, Bill){

    return function(){
        var deffered = $q.defer();

        Bill.get({id:$route.current.params.bill_id},
            function(bill){
                deffered.resolve(bill);
            },
            function(){
                deffered.reject('UNABLE TO FETCH BILL WITH ID : '+$route.current.params.bill_id);
            });

        return deffered.promise;
    }

}]);

services.factory('PersistentService', function(){
    var bill;
    return {
        getBill : function(){return bill;},
        setBill : function(bill_to_Set){bill = bill_to_Set;}
    }
});