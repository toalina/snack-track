module.exports = function(app) {
  app.controller('SignupController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
    $scope.headingText = 'Create a New Snacker';
    $scope.buttonText = 'Create Snacker';
    $scope.authenticate = function(user) {
      $http.post('/api/signup', user)
        .then(function(res){
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/sweets');
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.changePlaces = function() {
      $location.path('/signin');
    };
  }]);
};
