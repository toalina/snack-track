module.exports = function(app) {
  app.controller('SigninController', ['$scope', '$http', '$location', '$base64', '$cookies', function($scope, $http, $location, $base64, $cookies) {
    $scope.headingText = 'Sign in to Existing Snacker';
    $scope.buttonText = 'Log In';

    $scope.authenticate = function(user) {
      $http({
        method: 'GET',
        url: '/api/signin',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(user.username + ':' + user.password)
        }
      })
      .then(function(res) {
        $cookies.put('token', res.data.token);
        $scope.getUser(); //from auth controller
        $location.path('/snacks');
      }, function(err) {
        console.log(err);
      });
    };

    $scope.changePlaces = function() {
      $location.path('/signup');
    };
  }]);
};
