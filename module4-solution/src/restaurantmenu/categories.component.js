(function () {
  "use strict";

  angular.module("MenuApp").component("categories", {
    templateUrl: "src/restaurantmenu/templates/categories.template.html",
    bindings: {
      items: "<",
    },
  });
})();
