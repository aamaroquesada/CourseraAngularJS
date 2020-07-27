(function () {
  "use strict";
  angular
    .module("MenuApp")
    .controller("MainCategoriesController", MainCategoriesController);

  MainCategoriesController.$inject = ["menus"];
  function MainCategoriesController(menus) {
    var mainCategories = this;
    mainCategories.menus = menus.data;
  }
})();
