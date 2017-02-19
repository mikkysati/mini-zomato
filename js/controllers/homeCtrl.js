angular.module('zomatoApp')
  .controller('homeCtrl', function(queryService, storedService, $rootScope, $q, $state) {

  	var self = this;

    self.selectedCity = storedService.getCurrentLocation();

    self.setCurrentLocation = function() {
      storedService.setCurrentLocation(self.selectedCity);
    };

    self.searchLocations = function(query) {
      var query = $('#location-search input')[0].value;
      var deferred = $q.defer(query);
      queryService.getLocations(query).then((result) => {
      	deferred.resolve(result.data.location_suggestions);
      }, (error) => {
      	deferred.reject(error);
      	console.log(error);
      });
      return deferred.promise;
    };

    self.searchRestaurants = function() {
    	var deferred = $q.defer();
      var query = self.query || '';
    	queryService.getRestaurants(query)
    	.then((result) => {
    	  console.log(result.data);
    	  storedService.setStoredRestaurants(result.data);
    	  storedService.setQuery(self.query);
        storedService.setSortByFilter(true);
    	  $state.go('restaurants');
    	}, (error) => {
    		console.log(error);
    	});
    };

  })