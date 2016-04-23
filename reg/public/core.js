 var app = angular.module('customerModule', ['ngRoute'])
    app.config(function($routeProvider){
            $routeProvider
            .when('/home',{
              templateUrl : "customer.html",
              controller: "listControllers"
            })
            .when('/list', {
              templateUrl : "list.html",
              controller: "mainController"
            })
            .otherwise({
                            redirectTo:"/home"
            });
          })
   
 app.controller('mainController', function($scope,$http){
 $scope.users={};

 var details = {
  _id : " ",
  practiceName : "practiceName ",
  practiceEmail :"practiceEmail ",
  practicePassword : " practicePassword",
  practiceUsername :"practiceUsername "
 };
 $scope.details = details;

 $scope.showPracticeForm = function(){
            $scope.practiceForm = true;
          }

$http.get('/list/Customerlogin')
        .success(function(data) {
            $scope.Customerlogin = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

 $scope.createcust = function() {
        $http.post('/list/Customerlogin',$scope.users)
            .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //$scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});

 app.controller('listControllers', function($scope, $http){
  $http.get('/list/Customerlogin')
        .success(function(data) {
            $scope.Customerlogin = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        
 });
	