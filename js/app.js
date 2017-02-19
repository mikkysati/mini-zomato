// function DataService() {
// var data = [
//     {
//         "name":"Kerem Suer",
//         "username":"kerem",
//         "tweet":"Some First tweet Some First tweetSome First tweet Some First tweetSome First tweet Some First tweetSome First tweet Some First t",
//         "refresh":20,
//         "time":"2m",
//         "avator":"img/download.jpg"
//     }
// ];
//     this.listData = function() {
//         return data;
//     };
// }

angular.module('zomatoApp', ['ui.router', 'oi.select'])

  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('restaurants', {
        url: '/',
        templateUrl: 'views/restaurants.html'
      })
  });

  // .controller('MainCtrl', ['DataService', function(DataService) {
  //   var self = this;
  //   self.data = DataService.listData();
  // }])
  
  // .service('DataService', [DataService]);
