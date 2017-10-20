
angular.module('app', [])
  .controller('New_Exercise',  function($scope, $http, $window) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

    console.log("IN NEW EXER");

    $('#summernote').summernote({
      height: 730,                 // set editor height
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
    //
    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/levels?course_id="+$scope.selectedCourse,config)
        .then(function(response) {
          $scope.levels = response.data;
          console.log(response.data);
      });
    };

    $scope.changeLevel = function() {
      $http.get("http://localhost:8088/api/v1/lessons?level_id="+$scope.selected_level,config)
        .then(function(res) {
          $scope.lecciones = res.data;
          console.log(res.data);
      });
    };
    //
    //
    // $scope.submit = function(){
    //   console.log("kakakakakaaka");
    //    var url = "http://localhost:8088/api/v1/lessons/new"
    //   var data = {
    //     "name" : $scope.lesson_name,
    //     "course_id" : parseInt($scope.selectedCourse),
    //     "level_id": parseInt($scope.selected_level),
    //     "code": $('#summernote').summernote('code')
    //   }
    //   console.log(data);
    //
    //   var config = {
    //     headers: {
    //       'Authorization': localStorage.getItem("token")
    //     }
    //   };
    //
    //   $http.post(url, data, config)
    //           .success(function (data, status, headers, config) {
    //             console.log("LECCION CREADA")
    //           })
    //           .error(function (data, status, header, config) {
    //             console.log("UBO ERROR")
    //           });
    // }
    //

  });
