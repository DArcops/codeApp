
var app = angular.module('app', [])
  app.controller('Stats',  function($scope, $http, $window) {

    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    var location = $window.location.pathname;
    var course_id = location.substring(location.length-1,location.length)

    $http.get("http://localhost:8088/api/v1/users/profile",config)
    .then(function(response) {
      $scope.administrator = response.data.administrator;
    });


    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        $scope.courses = response.data;
        var cid = $scope.courses[$scope.courses.length-1].id;
        console.log(response.data);

        $http.get("http://localhost:8088/api/v1/courses/"+cid+"/users_suscribed",config)
          .then(function(response) {
            $scope.users = response.data;
            console.log($scope.users);
        });

    });


    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/courses/"+$scope.selectedCourse+"/users_suscribed",config)
        .then(function(response) {
          $scope.users = response.data;
          console.log($scope.users);
      });
    };
  });

////////////////////CONTROLLER FOR LAYOUT/////////////////////

  app.controller('layout', function($scope, $http, $window) {
    if(localStorage.getItem("token") === null)
    $window.location.href = "/login"

    $scope.logout = function(){
    localStorage.clear();
    $window.location.href = '/login'
    }
    });

app.controller('layout_user', function($scope, $http, $window) {
      $scope.userName = localStorage.getItem("user_name");
      $scope.userEmail = localStorage.getItem("user_email");
  });
