angular.module('zomatoApp')
  .controller('restaurantsCtrl', function(queryService, storedService, $scope, $timeout) {

    /* for sortBy variables */
    $scope.sortVariable = 'popu';
    $scope.costForTwo = false;

  	$scope.restaurants = storedService.getStoredRestaurants().restaurants;
  	$scope.currentCity = storedService.getCurrentLocation().city_name;

    var queryFilter ='', queryValue ='', queryCuisine ='';

  	$scope.$watch(() => {return storedService.getStoredRestaurants()}, (data) => {
  	  $scope.restaurants = data.restaurants;
  	  $scope.currentCity = storedService.getCurrentLocation().city_name;
      if(storedService.getSortByFilter()) {
        $scope.sortVariable = 'popu';
        queryFilter ='';
        queryValue ='';
        queryCuisine ='';
        $scope.getCuisines();
        $scope.cuisineVariable = false;
      };
      $scope.costForTwo = false;
      $scope.nameVariable = false;
  	});

  	$scope.$watch(() => {return storedService.getStoredRestaurants()}, (data) => {
  	  $scope.restaurants = data.restaurants;
  	});

  	$scope.sortByName = function(value) {
  	  if (value ===1) $scope.restaurants = _.sortBy($scope.restaurants, (o) => { return o.restaurant.name});
  	  else $scope.restaurants = _.sortBy($scope.restaurants, (o) => { return o.restaurant.name}).reverse();
  	};

  	$scope.sortBy = function(filter, value) {
      var query = storedService.getQuery() || '';
  	  queryService.getRestaurants(query, filter, value, queryCuisine)
	  	.then((result) => {
        queryFilter = filter;
        queryValue = value;
	      storedService.setStoredRestaurants(result.data);
        storedService.setSortByFilter(false);
	  	}, (error) => {
	      console.log(error);
	  });
  	};

    $scope.filterBy = function(low, high) {
      $scope.restaurants = storedService.getStoredRestaurants().restaurants;
      $scope.restaurants = _.filter($scope.restaurants, function(o) { 
        return (o.restaurant.average_cost_for_two <= high) && (o.restaurant.average_cost_for_two >= low)
      });
      if ($scope.nameVariable === 'nameasc') {
        $scope.restaurants = _.sortBy($scope.restaurants, (o) => { return o.restaurant.name});
      } else if ($scope.nameVariable === 'namedesc') {
        $scope.restaurants = _.sortBy($scope.restaurants, (o) => { return o.restaurant.name}).reverse();
      } else {};
    }

    $scope.filterByCuisines = function(index, cuisine) {
      if(!cuisine) $scope.cuisineVariable = index;
      else $scope.cuisineVariable = false;
      queryCuisine = cuisine || $scope.cuisines.cuisines[index].cuisine.cuisine_id || '';
      var query = storedService.getQuery() || '';
      queryService.getRestaurants(query, queryFilter, queryValue, queryCuisine)
      .then((result) => {
        storedService.setStoredRestaurants(result.data);
        storedService.setSortByFilter(false);
      }, (error) => {
        console.log(error);
      });
    }

    $scope.removeFilter = function() {
      $scope.restaurants = storedService.getStoredRestaurants().restaurants;
    }

    $scope.getCuisines = function() {
      queryService.getCuisines().
      then((result) => {
        $scope.cuisines = result.data;
        storedService.setCuisines($scope.cuisines);
        console.log('cuisines: ', $scope.cuisines);
      }, (error) => {
        console.log(error);
      });
    };

    $scope.getCuisines();

  })