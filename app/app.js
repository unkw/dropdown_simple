/**
 * Test task
 */
angular.module('app', [])

    .run(function($document, $rootScope) {
        $document.on('click', function(e) {
            $rootScope.$broadcast('documentClick', angular.element(e.target));
        });

        $document.on('keydown', function(e) {
            $rootScope.$broadcast('keydown', e.which);
        });
    })

    .controller('AppCtrl', function($scope) {
        $scope.cities = ['San Francisco', 'Moscow', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Paris'];
        $scope.city = 'San Francisco';
    })

;