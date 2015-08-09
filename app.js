(function() {
    var pomodoroApp = angular.module("pomodoroApp", []);

    function updateResetButton(disabled) {
        var resetButton = $(".js-clock-reset-button");

        resetButton.attr("disabled", disabled);
    }

    pomodoroApp.controller("ClockCtrl", ["$scope", "$interval", function($scope, $interval) {
        var intervalPromise = null;
        $scope.isTicking = false;
        $scope.timeLeft = defaultSessionTime*60*1000;
        $scope.clockSessionTime = defaultSessionTime;
        $scope.onOffButtonText = "Start";

        $scope.clockOnOff = function() {
            $scope.isTicking = !$scope.isTicking;

            if(!$scope.isTicking && intervalPromise !== null)
            {
                $interval.cancel(intervalPromise);
                $scope.onOffButtonText = "Start";
            }
            else if($scope.isTicking)
            {
                intervalPromise = $interval(function() {
                    $scope.timeLeft -= 1000;
                }, 1000);
                $scope.onOffButtonText = "Pause";
            }

            updateResetButton($scope.isTicking);
        };

        $scope.clockReset = function() {
            if($scope.isTicking)
                return;

            $scope.timeLeft = $scope.clockSessionTime*60*1000;
        };
    }]);
})();