
angular.module('app', [])
  .controller('Login',  function($scope, $http, $window) {
    console.log("visas");

    if(localStorage.getItem("token") !== null)
      $window.location.href = "/courses"

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
                localStorage.setItem("user_name",data.user_name)
                localStorage.setItem("user_email",data.user_email)
                $window.location.href = "/courses"
              })
              .error(function (data, status, header, config) {
                console.log(status)
              });
    }

  });
