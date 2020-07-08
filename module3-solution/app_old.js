(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var foundItems = this;
    foundItems.searchterm = "";
    foundItems.isNothing = false;
    var promise = MenuSearchService.getMatchedMenuItems();

    foundItems.removeItem = function (itemIndex) {
      foundItems.items.splice(itemIndex, 1);
    };

    foundItems.listMenuItems = function () {
      promise
        .then(function (response) {
          var items = response.data;
          var returnItems = [];
          console.log("Search term:", foundItems.searchterm);
          if (foundItems.searchterm !== "") {
            for (var i = 0; i < items.menu_items.length; i++) {
              if (
                items.menu_items[i].description
                  .toLowerCase()
                  .indexOf(foundItems.searchterm) !== -1
              ) {
                //console.log(items.menu_items[i]);
                returnItems.push(items.menu_items[i]);
              }
            }
          }
          if (returnItems.length === 0) {
            foundItems.isNothing = true;
          } else {
            foundItems.isNothing = false;
          }

          console.log(returnItems);

          foundItems.items = returnItems;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function () {
      var response = $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      });
      return response;
    };
  }

  function FoundItems() {
    var ddo = {
      templateUrl: "listItem.html",
      scope: {
        list: "<myList",
      },
    };

    return ddo;
  }
})();
