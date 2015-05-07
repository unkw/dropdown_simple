/**
 * Dropdown list
 */
angular.module('app').directive('dropdown', function($rootScope) {

    return {
        restrict: 'E',
        templateUrl: 'templates/dropdown.html',
        scope: {
            list: '=',
            selected: '='
        },

        controller: function($scope) {
            $scope.list.unshift('');
            $scope.focused = false;

            /**
             * @param {number} index
             * @returns {boolean}
             */
            $scope.isHovered = function(index) {
                return $scope.hoverIndex === index;
            };

            /**
             * @param {number} index
             */
            $scope.setHoverIndex = function(index) {
                if ($scope.hoverIndex !== index) {
                    var listLength = $scope.list.length;
                    $scope.hoverIndex = listLength > index ? index === -1 ? listLength - 1 : index : 0;
                }
            };

            /**
             * @param {string} item
             */
            $scope.setSelected = function(item) {
                $scope.selected = item;
            };

            /**
             * @param {boolean} value
             */
            $scope.toggleList = function(value) {
                $scope.listExpanded = value;
            }
        },

        link: function($scope, element, attrs) {
            $rootScope.$on('documentClick', function(e, target) {
                if (!target.hasClass('b-dropdown-button')) {
                    $scope.$apply(function() {
                        $scope.toggleList(false);
                    });
                }

                $scope.focused = /b-dropdown-.+/.test(target.attr('class'));
            });

            $rootScope.$on('keydown', function(e, code) {
                if ($scope.listExpanded) {
                    switch (code) {
                        // Enter
                        case 13:
                            $scope.$apply(function() {
                                $scope.setSelected($scope.list[$scope.hoverIndex] || '');
                                $scope.toggleList(false);
                            });
                            break;
                        // Escape
                        case 27:
                            $scope.$apply(function() {
                                $scope.toggleList(false);
                            });
                            break;
                        // Up
                        case 38:
                            $scope.$apply(function() {
                                $scope.setHoverIndex($scope.hoverIndex - 1);
                            });
                            break;
                        // Down
                        case 40:
                            $scope.$apply(function() {
                                $scope.setHoverIndex($scope.hoverIndex + 1);
                            });
                            break;
                    }
                } else if ($scope.focused) {
                    switch (code) {
                        case 13:
                        case 32:
                        case 40:
                            $scope.$apply(function() {
                                $scope.toggleList(true);
                            });
                            break;
                    }
                }
            });

            $scope.$watch('listExpanded', function(expanded) {
                if (!expanded) {
                    $scope.setHoverIndex(0);
                }
            });
        }
    }

});