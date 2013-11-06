'use strict';

describe('Controller: SuggestNameController', function () {

  // load the controller's module
  beforeEach(module('krautli_yoApp'));
  // we are using Bootstrap style classes in our HTML so fire up the Bootstrap UI script to attach the functionality 
  // load the BootstrapUI module
  beforeEach(module('ui.bootstrap'));

  var SuggestNameController,
      scope,
      test_data = [];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuggestNameController = $controller('SuggestNameController', {
      $scope: scope
    });
  }));

/*
  it('test_no_data_renders_empty_list_html', function () {
    scope.plantNames = [];

    expect(scope.plantNames.length).toBe(0);
  });

  it('test_ignore_first_dataset_and_render_empty_list', function () {
    var test_data = [{"name" : "Herb-Name"}];

    expect(scope.plantNames.length).toBe(0);
  });

  it('test_single_herbal_renders_one_item_list_html', function () {
    var test_data = [{"name" : "Herb-Name"},{"name" : "Arnika"}];

    expect(scope.plantNames.length).toBe(1);
  });
*/

});
