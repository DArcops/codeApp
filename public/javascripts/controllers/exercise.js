
var app = angular.module('app', [])
  app.controller('Exercise',  function($scope, $http, $window) {

    console.log("ejercitando... "+editor.getValue())
    if(localStorage.getItem("token") === null)
      $window.location.href = "/login"

      $('#summernote').summernote({
        focus: true                  // set focus to editable area after initializing summernote
      });

      var location = $window.location.pathname
      exercise_id = location.substring(location.lastIndexOf("/")+1,location.length)

      var slash = [];
      for(var i= 0; i < location.length; i++)
        if(location[i] == "/")
          slash.push(i);

      var course_id = "";
      var lesson_id = location.substring(slash[3]+1,slash[4]);

      for(var i = 9; ; i++)
        if(location[i] == "/") break;
        else course_id += location[i];

        var config = {
          headers: {
            'Authorization': localStorage.getItem("token")
          }
        };

      $http.get("http://localhost:8088/api/v1/exercises/"+exercise_id+"?course_id="+course_id+"&lesson_id="+lesson_id,config)
      .then(function(response) {
        console.log(response.data);
        $('#summernote').summernote('code',response.data.code);
        $('#summernote').summernote('destroy');
      });

      $scope.probar = function(){
        console.log("testing")
      }



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
