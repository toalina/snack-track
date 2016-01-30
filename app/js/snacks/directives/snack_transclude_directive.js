module.exports = function(app) {
  app.directive('snackTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/snack_transclude_directive.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    };
  });
};
