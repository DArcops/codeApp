
angular.module('app', [])
  .controller('List_Courses',  function($scope, $http, $window) {

    console.log("listando...")
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      var config = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
      };

      $http.get("http://localhost:8088/api/v1/courses/",config)
        .then(function(response) {
          $scope.courses = response.data;
          console.log(response.data);
      });
  });
