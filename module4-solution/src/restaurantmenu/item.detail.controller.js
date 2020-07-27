(function () {
  "use strict";

  angular
    .module("MenuApp")
    .controller("ItemDetailController", ItemDetailController);

  ItemDetailController.$inject = ["$stateParams", "items"];
  function ItemDetailController($stateParams, items) {
    var itemDetail = this;
    itemDetail.items = items.data.menu_items;
    itemDetail.categoryName = $stateParams.categoryName;
  }
})();
