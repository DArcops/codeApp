
angular.module('app', [])
  .controller('New_Lesson',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    $('#summernote').summernote({
      height: 250,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: true                  // set focus to editable area after initializing summernote
    });

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

    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/levels?course_id="+$scope.selectedCourse,config)
        .then(function(response) {
          $scope.levels = response.data;
          console.log(response.data);
      });
    };


    $scope.submit = function(){
      // var url = "http://localhost:8088/api/v1/users/login"
      // var data = {
      //   "" : $scope.email,
      //   "pass" : $scope.pass,
      // }
      // console.log(data);
      // var config = {};
      //
      // $http.post(url, data, config)
      //         .success(function (data, status, headers, config) {
      //           console.log(data)
      //
      //           localStorage.setItem("token",data.token)
      //           $window.location.href = "/dashboard/courses"
      //         })
      //         .error(function (data, status, header, config) {
      //           console.log(status)
      //         });
      console.log($scope.selectedCourse)
      console.log($('#summernote').summernote('code'));

    }

  });
