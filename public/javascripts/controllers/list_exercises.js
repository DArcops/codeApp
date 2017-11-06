var app = angular.module('app', [])
  app.controller('List_Exercies',  function($scope, $http, $window,$timeout) {

    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      $('#summernote').summernote({
        focus: true                  // set focus to editable area after initializing summernote
      });

      console.log("si sirve x 2 ")
      var config = {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      };

      var location = $window.location.pathname;
      var lastSlash = location.lastIndexOf("/")
      var lesson_id = location.substring(lastSlash+1,location.length)
      var lesson;

      $http.get("http://localhost:8088/api/v1/lessons/"+lesson_id,config)
      .then(function(response) {
        lesson = response.data;
        $('#summernote').summernote('code',lesson.code);
        $('#summernote').summernote('destroy');
      });

      $http.get("http://localhost:8088/api/v1/exercises/"+lesson_id,config)
      .then(function(response) {
        lesson = response.data;
        $('#summernote').summernote('code',lesson.code);
        $('#summernote').summernote('destroy');
      });




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
