(function () {
  "use strict";
  angular.module("data").component("items", {
    templateUrl: "src/restaurantmenu/templates/item.template.html",
    bindings: {
      items: "<",
    },
  });
})();
