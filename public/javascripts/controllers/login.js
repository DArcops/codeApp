
angular.module('app', [])
  .controller('Login',  function($scope, $http, $window) {
    console.log("visas");
    $scope.submit = function(){
      var url = "http://localhost:8088/api/v1/users/login"
      var data = {
        "email" : $scope.email,
        "pass" : $scope.pass,
      }
      console.log(data);
      var config = {};

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                console.log(data)

                localStorage.setItem("token",data.token)
                $window.location.href = "/dashboard/courses"
              })
              .error(function (data, status, header, config) {
                console.log(status)
              });
    }

  });
