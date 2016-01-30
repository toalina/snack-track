module.exports = function(app) {
  app.directive('snackFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/snack_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        snack: '=',
        save: '&'
      }
    };
  });
};
