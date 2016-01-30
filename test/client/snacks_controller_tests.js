require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('snacks controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('SnackTrackApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('SnacksController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.snacks)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SnacksController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to snacks with a GET all', function() {
      $httpBackend.expectGET('/api/snacks').respond(200, [{_id: 1, name: 'test snack'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.snacks[0].name).toBe('test snack');
    });

    it('should be able to create a new snack', function() {
      $httpBackend.expectPOST('/api/snacks', {name: 'test snack', fishPreference: 'Salmons', flavor: "grizzly"}).respond(200, {name: 'a different snack'});
      expect($scope.nacks.length).toBe(0);
      expect($scope.newSnack).toEqual($scope.defaults);
      $scope.newSnack.name = 'test snack';
      $scope.create($scope.newSnack);
      $httpBackend.flush();
      expect($scope.snacks[0].name).toBe('a different snack');
      expect($scope.newSnack).toEqual($scope.defaults);
    });
  });
});
