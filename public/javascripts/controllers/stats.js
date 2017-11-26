
var app = angular.module('app', [])
  app.controller('Stats',  function($scope, $http, $window) {

    var config = {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
    };

    var location = $window.location.pathname;
    var course_id = location.substring(location.length-1,location.length)

    $http.get("http://localhost:8088/api/v1/users/profile",config)
    .then(function(response) {
      $scope.administrator = response.data.administrator;
    });


    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        $scope.courses = response.data;
        var cid = $scope.courses[$scope.courses.length-1].id;
        console.log(response.data);

        $http.get("http://localhost:8088/api/v1/courses/"+cid+"/users_suscribed",config)
          .then(function(response) {
            $scope.users = response.data;
            console.log($scope.users);
        });

    });


    $scope.change = function() {
      $http.get("http://localhost:8088/api/v1/courses/"+$scope.selectedCourse+"/users_suscribed",config)
        .then(function(response) {
          $scope.users = response.data;
          console.log($scope.users);
      });
    };

    var labels = [];

    $http.get("http://localhost:8088/api/v1/courses/",config)
      .then(function(response) {
        var re = response.data;
        for(var i =0; i < re.length; i++){
          labels.push(re[i].name)
        }
    });

    var oilCanvas = document.getElementById("oilChart");
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 10;
    var oilData = {
    labels: [
    "Saudi Arabia",
    "Russia",

    ],
    datasets: [
    {
    data: [133.3, 86.2],
    backgroundColor: [
    "#FF6384",
    "#63FF84",
    "#84FF63",
    "#8463FF",
    "#6384FF"
    ]
    }]
    };
    var pieChart = new Chart(oilCanvas, {
    type: 'pie',
    data: oilData
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
