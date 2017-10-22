var app = angular.module('app', [])
  app.controller('New_Course',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    $scope.submit = function(){
      var url = "http://localhost:8088/api/v1/courses/new"
      var data = {
        "name" : $scope.course_name,
        "short_description": $scope.short_description,
        "large_description" : $scope.course_description,
      }
      console.log(data);
      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                console.log("Ya se creo")
              })
              .error(function (data, status, header, config) {
                if(status == 401)
                  $window.location.href = "/login"
              });

    }

  });

  ///////////////////CONTROLLER FOR LAYOUT/////////////////////

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
