  var app = angular.module("myApp", ['ui.bootstrap', 'pascalprecht.translate']);
        app.factory("myFactory", function() {
            var datas = {};
            var dataArray = [];
            var tId = '';
            var tName = '';
            datas.setData = function(id, name) {
                tId = id;
                tName = name;
                dataArray.push({
                    'taskid': tId,
                    'taskname': tName
                });
            }
            datas.getData = function() {
                return dataArray;
            }
            return datas;
        });
        app.config(function($translateProvider, $translatePartialLoaderProvider) {
            $translatePartialLoaderProvider.addPart('home');
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: '/i18n/{part}/{lang}.json'
            });
        });
        app.controller("myController", ['$scope', '$uibModal', 'myFactory', '$translatePartialLoader', '$translate', function($scope, $uibModal, myFactory, $translatePartialLoader, $translate) {
        	$translate.use('en');
             $scope.data = myFactory.getData();
            $scope.text="hai";
            $scope.setLang = function(val) {
                $translate.use(val);
            }   
            $scope.add_item = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'popup.html',
                    controller: 'popController',
                });
            }
           
            $scope.remove = function(id) {
                angular.forEach($scope.data, function(value, key) {
                    angular.forEach(value, function(val, index) {
                        if (id === val) {
                            $scope.data.splice(key, 1);
                        }
                    })
                });

            }

        }]);
        app.controller('popController', ['$scope', 'myFactory','$uibModalInstance', function($scope, myFactory,$uibModalInstance) {
            $scope.hideTask = function() {
                $uibModalInstance.dismiss('cancel');
            };
             

            $scope.id_valid = /^[0-9]+$/;
            $scope.name_valid = /^[a-zA-Z0-9]+$/;
            $scope.flag = 0;
            $scope.addTask = function() {

                if ($scope.new_taskid && $scope.new_taskname) {
                    angular.forEach($scope.data, function(value, key) {
                        angular.forEach(value, function(val, index) {
                            if ($scope.new_taskid == val) {
                                alert("already exist");
                                $scope.flag = 1;
                            }
                        })
                    })
                    if ($scope.flag == 0) {

                        myFactory.setData($scope.new_taskid, $scope.new_taskname);
                        $scope.taskk = myFactory.getData();
                        console.log($scope.taskk);
                        $scope.hideTask();
                    }
                } else {
                    alert("Enter numbers");
                }
            }
        }]);