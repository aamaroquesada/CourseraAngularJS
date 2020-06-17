(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.isTooMuch = function () {
      var message = "";
      const strFood = $scope.listOfFood;
      //const words = strFood.split(",");

      if (!$scope.listOfFood) message = "Please enter data first.";
      else if (strFood.split(",").length > 3) message = "Too much!";
      else message = "Enjoy!";

      $scope.message = message;
    };
  }
})();
