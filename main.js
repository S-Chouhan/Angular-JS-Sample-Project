(function() {

  var app = angular.module("main", []);
  var maincontroller = function($scope, $http, $interval, $log, $location, $anchorScroll, github) {

    var onusercomplete = function(data) {
      $scope.user = data;

      github.getrepos($scope.user)
        .then(onRepos, onError);
      $location.hash("userdetails");
      $anchorScroll();

    };

    var decrementcountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);

      }


    };

    var countdownInterval = null;
    var startcountdown = function() {
      countdownInterval = $interval(decrementcountdown, 1000, $scope.countdown);


    };

    var onRepos = function(data) {
      $scope.Rep = data;


    };

    $scope.search = function(username) {
      $log.info("searching for " + username);
      username=username===undefined?'angular':username;
      github.getuser(username).then(onusercomplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }


    };
    var onError = function(reason) {
      $scope.error1 = "Error accured";


    };

    $scope.countdown = "10";
    startcountdown();

  };
  app.controller("maincontroller", ["$scope", "$http", "$interval", "$log", "$location", "$anchorScroll", "github", maincontroller]);

}());