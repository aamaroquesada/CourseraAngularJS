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
    foundItems.searchTerm = "";

    //   foundItems.listMenuItems = function () {
    //     var returnItems = MenuSearchService.getMatchedMenuItems(
    //       foundItems.searchTerm
    //     );
    //     console.log(returnItems);
    //     foundItems.items = returnItems;
    //   };

    // foundItems.removeItem = function (itemIndex) {
    //   foundItems.items.splice(itemIndex, 1);
    //  };
    foundItems.removeItem = function (index) {
      MenuSearchService.removeItem(index);
    };

    foundItems.listMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(
        foundItems.searchTerm
      );
      promise
        .then(function (response) {
          foundItems.isNothing = MenuSearchService.isNothing;
          foundItems.items = response;
        })
        .catch(function (error) {
          console.log(error);
        });
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

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var returnItems = [];

    service.removeItem = function (itemIndex) {
      returnItems.splice(itemIndex, 1);
    };

    service.getMatchedMenuItems = function (searchTerm) {
      //return response;
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      }).then(function (result) {
        var items = result.data;
        service.isNothing = false;
        returnItems = [];
        if (searchTerm !== "") {
          for (var i = 0; i < items.menu_items.length; i++) {
            if (
              items.menu_items[i].description
                .toLowerCase()
                .indexOf(searchTerm) !== -1
            ) {
              //console.log(items.menu_items[i]);
              returnItems.push(items.menu_items[i]);
            }
          }
        } else {
          service.isNothing = true;
        }
        if (returnItems.length === 0) {
          service.isNothing = true;
        }

        return returnItems;
      });
    };
  }
})();
