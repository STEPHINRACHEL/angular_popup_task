

describe('PopController', function() {
	beforeEach(module('myApp'));
	var $controller;
  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  describe('add', function() {
    it('checks if the new task is added', function() {
    	var modalInstance;
    	    modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };  
	      var $scope = {};
	      var controller = $controller('popController', { $scope: $scope,$uibModalInstance:modalInstance });
	      $scope.new_taskid='101';
	      $scope.new_taskname='task1';
	      $scope.addTask();
	      console.log("task",$scope.taskk);
	      expect($scope.taskk).toEqual(jasmine.objectContaining([Object({taskid: "101",taskname:"task1"})])); 

    });
  });
  describe('remove', function() {
    it('checks if the task is removed', function() {
	    var $scope = {};
	    var controller = $controller('myController', { $scope: $scope });
	    var data=[{'taskid':'105','taskname':'task5'}];
	     $scope.remove('105');
	    expect($scope.data).not.toEqual(jasmine.objectContaining([Object({taskid: "105",taskname:"task5"})])); 

    });
  });
});
