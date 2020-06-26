(function () {
  "use strict";

  angular
    .module("TestApp", [])
    .controller("TestController", TestController)
    .filter("lovers", LoversFilter);

  TestController.$inject = ["$scope", "loversFilter"];
  function TestController($scope, loversFilter) {
    $scope.changeFormat = function () {
      //  var output = $filter("currency");
      //  //var output = $scope.number;
      //  $scope.output = output($scope.number, "R$");
      //  $scope.number = output;
      var msg = $scope.number;
      console.log(msg);
      $scope.number = loversFilter(msg)("likes", "lovers");
    };
  }

  function LoversFilter() {
    return function (input, target, replace) {
      input = input || "";
      return input.replace(target, replace);
    };
  }
})();
