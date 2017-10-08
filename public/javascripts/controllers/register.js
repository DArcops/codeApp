angular.module('app', [])
  .controller('Register',  function($scope, $http,$window) {

    var url = "http://localhost:8088/api/v1/users/register"

    $scope.submit2 = function(){

      var data = {
        "username" : $scope.username,
        "email": $scope.email,
        "pass" : $scope.pass,
      }
      console.log(data);
      var config = {
                  // headers : {
                  //     'Access-Control-Allow-Origin': '*'
                  // }
              }

      $http.post(url, data, config)
              .success(function (data, status, headers, config) {
                $window.location.href = "/login"
                console.log("papas");
              })
              .error(function (data, status, header, config) {
                console.log(data)
              });
    }

  });
