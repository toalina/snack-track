var angular = window.angular;

module.exports = function(app) {
  app.controller('SnacksController', ['$scope', '$http', 'cfResource', '$location', function($scope, $http, cfResource, $location) {
    $scope.snacks = [];
    $scope.errors = [];
    $scope.defaults = {calories: 5000};
    $scope.newSnack = angular.copy($scope.defaults);
    $scope.messageOne = "Hello from inside the controller";
    var snacksResource = cfResource('snacks');

    if(!$scope.token)
      $location.path('/signup');

    $scope.getAll = function() {
      snacksResource.getAll(function(err, data) {
        if (err) return err;

        $scope.snacks = data;
      });
    };

    $scope.create = function(snack) {
      snacksResource.create(snack, function(err, data) {
        if (err) return err;
        $scope.snacks.push(data);
        $scope.newsnack = angular.copy($scope.defaults);
      });
    };

    $scope.update = function(snack) {
      snack.editing = false;
      $http.put('/api/snacks/' + snack._id, snack)
      .then(function(res) {
        console.log('this snack has a new identity');
      }, function(err) {
        $scope.errors.push('could not get snack: ' + snack.name);
        console.log(err.data);
      });
    };

    $scope.remove = function(snack) {
      $scope.snacks.splice($scope.snacks.indexOf(snack), 1);
      $http.delete('/api/snacks/' + snack._id)
      .then(function(res) {
        console.log('deleted snack!');
      }, function(err) {
        console.log(err.data);
        $scope.errors.push('could not delete snack: ' + snack.name);
        $scope.getAll();
      });
    };
  }]);
};
