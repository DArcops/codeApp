angular.module('app',[])
  .controller('bfs_main',function($scope){

    var intent = "";
    var answer  = "#include <bits/stdc++.h>\nusing namespace std;\nvector< vector<int> > V;\n\nint main(){\nV.assign(nodos+10,vector<int>());\nV[1].push_back(2);\nV[2].push_back(3);\nV[3].push_back(1);\nreturn 0;\n}";
    $scope.message = false;
    $scope.btn_next = false;
    $scope.Color  = "";
    $scope.eval = true;
    $scope.calificacion = "";
    $scope.text = "#include <bits/stdc++.h>\nusing namespace std;\nvector< vector<int> > V;\n\nint main(){\nV.assign(nodos+10,vector<int>());\nreturn 0;\n}";

    $scope.validate = function(){
      $scope.message = true;

      intent = $scope.text.replace(/\n| /g,"");
      answer = answer.replace(/\n| /g,"");
      console.log(intent);
      console.log(answer);

      if(intent == answer){
        $scope.calificacion = "Accepted";
        $scope.Color = "green";
        $scope.btn_next = true;
        $scope.eval = false;
      }
      else{
        $scope.calificacion = "Hay algo mal,revisalo por favor";
        $scope.Color = "red";
      }
    };

  } );