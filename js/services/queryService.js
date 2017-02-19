angular.module('zomatoApp')
  .service('queryService', function($http, storedService) {

  	var self = this;

  	const USER_KEY = '7fc7934b48e258f24ef7c165503e946d';

  	const URL = 'https://developers.zomato.com/api/v2.1/';

    self.getLocations = function(query) {        // To Do: cancel previous requests

      query = query.split(' ').join('%20');

  	  var promise = $http({
  	  	headers: {'user-key': USER_KEY},         // To Do: make http interceptor instead of this 
  	  	method: 'GET',
  	  	url: URL + 'locations',
  	  	params: {query: query, count: 10}
  	  });
  	  return promise;
    };

    self.getRestaurants = function(query, sort, order, cuisine) {

      var currentLocation = storedService.getCurrentLocation();
      query = query.split(' ').join('%20');
      sort = sort || '';
      order = order || '';
      cuisine = cuisine || '';

      var promise = $http({
  	  	headers: {'user-key': USER_KEY},         // To Do: make http interceptor instead of this 
  	  	method: 'GET',
  	  	url: URL + 'search',
  	  	params: {q: query, count: 20, entity_id: currentLocation.entity_id, entity_type: currentLocation.entity_type, sort: sort, order: order, cuisines: cuisine}
  	  });
  	  return promise;
    };

    self.getCuisines = function() {
    	var city_id = storedService.getCurrentLocation().city_id;
    	var promise = $http({
    	  headers: {'user-key': USER_KEY},
    	  method: 'GET',
    	  url: URL + 'cuisines',
    	  params: {city_id: city_id}
    	});
    	return promise;
    }

  });