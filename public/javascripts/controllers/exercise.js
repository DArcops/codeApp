
var app = angular.module('app', [])
  app.controller('Exercise',  function($scope, $http, $window) {

    console.log("ejercitando... "+editor.getValue())
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      $scope.probar = function(){
        console.log("testing")
      }

    $('#summernote').summernote({
      focus: true                  // set focus to editable area after initializing summernote
    });


  });
/////////////////////////////////////////////////
app.controller('Solution',  function($scope, $http, $window) {

    $scope.probar = function(){
      var code = editor.getValue();

      var url = "http://coliru.stacked-crooked.com/compile"
      var data = {
        "cmd" : "g++ -std=c++17 -O2 -Wall -pedantic -pthread main.cpp && ./a.out",
        "src": code
      }

      $http.post(url, data)
              .success(function (response) {
                console.log("Ya se compilo "+response )

              })
              .error(function (data, status, header, config) {
                console.log(data)
              });

    }

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
