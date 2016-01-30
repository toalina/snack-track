module.exports = function(app) {
  require('./controllers/snacks_controller')(app);
  require('./controllers/all_snacks_controller')(app);
  require('./directives/snack_directive')(app);
  require('./directives/snack_form_directive')(app);
  require('./directives/snack_transclude_directive')(app);
};
