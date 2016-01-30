module.exports = function(app) {
  app.controller('AllSnacksController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/allsnacks')
    .then(function(res) {
      $scope.snacks = res.data;
    }, function(err) {
      console.log(err);
    });
  }]);
};
