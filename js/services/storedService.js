angular.module('zomatoApp')
  .service('storedService', function() {

    var self = this;

    var defaultCity = {
      "entity_type": "city",
      "entity_id": 4,
      "title": "Bangalore",
      "latitude": 12.971606,
      "longitude": 77.594376,
      "city_id": 4,
      "city_name": "Bangalore",
      "country_id": 1,
      "country_name": "India"
    };

    var currentLocation = defaultCity;
    var storedRestaurants = [];
    var query = '';
    var sortByFilter = true;
    var cuisines = [];
    var currentCuisine = {};

    self.getSortByFilter = function() {
      return sortByFilter;
    };

    self.setSortByFilter = function(filter) {
      sortByFilter = filter;
    };

    self.getDefaultCity = function() {
      return defaultCity;
    };

    self.getCurrentLocation = function() {
      return currentLocation;
    };

    self.setCurrentLocation = function(location) {
      currentLocation = location;
    };

    self.getStoredRestaurants = function() {
      return storedRestaurants;
    };

    self.setStoredRestaurants = function(restaurants) {
      storedRestaurants = restaurants;
    };

    self.getQuery = function() {
      return query;
    };

    self.setQuery = function(q) {
      query = q;
    };

    self.getCuisines = function() {
      return cuisines;
    };

    self.setCuisines = function(q) {
      cuisines = q;
    };

    self.getCurrentCuisine = function() {
      return currentCuisine;
    };

    self.setCurrentCuisine = function(q) {
      currentCuisine = q;
    };

  });