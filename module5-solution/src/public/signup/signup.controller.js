(function () {
  "use strict";

  angular.module("public").controller("SignUpController", SignUpController);

  SignupController.$inject = ["SignUpService", "MenuService"];
  function SubscribeFormController(SignUpService, MenuService) {
    var $ctrl = this;

    $ctrl.save = function () {
      MenuService.getItem($ctrl.favoriteDish).then(
        function onSuccess() {
          SignUpService.addSignUp(
            $ctrl.firstName,
            $ctrl.lastName,
            $ctrl.email,
            $ctrl.phone,
            $ctrl.favoriteDish
          );
          $ctrl.success = true;
          $ctrl.dishError = false;
        },
        function onFailure() {
          $ctrl.dishError = true;
          $ctrl.success = false;
        }
      );
    };
  }
})();
