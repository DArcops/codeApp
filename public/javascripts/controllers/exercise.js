
var app = angular.module('app', [])
  app.controller('Exercise',  function($scope, $http, $window) {

    console.log("ejercitando...")
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      $('#summernote').summernote({
        minHeight:450,
        focus: true                  // set focus to editable area after initializing summernote
      });


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
