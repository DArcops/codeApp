angular.module('app', [])
  .controller('New_Course',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    $scope.submit = function(){
      var url = "http://localhost:8088/api/v1/courses/new"
      var data = {
        "name" : $scope.course_name,
        "description" : $scope.course_description,
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
