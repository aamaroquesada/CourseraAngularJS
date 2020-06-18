(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.isTooMuch = function () {
      var message = "";
      const strFood = $scope.listOfFood.split(",");
      var strFoodClean = [];
      //const words = strFood.split(",");

      if (!$scope.listOfFood) message = "Please enter data first.";
      else
        for (var i = 0; i < strFood.length; i++) {
          //if (!strFood[i]) strFoodClean.push(strFood[i]);
          if (strFood[i].trim() != "") strFoodClean.push(strFood[i]);
          //console.log(strFood[i]);
          console.log(strFoodClean);
        }
      //console.log(strFoodClean);

      if (strFoodClean.length > 3) message = "Too much!";
      else message = "Enjoy!";

      $scope.message = message;
    };
  }
})();
