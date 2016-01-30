module.exports = function(app) {
  app.directive('snackDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/snack_directive_template.html',
      scope: {
        snack: '=',
      }
    };
  });
};
