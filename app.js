(function() {
    var pomodoroApp = angular.module("pomodoroApp", []);

    function updateResetButton(disabled) {
        var resetButton = $(".js-clock-reset-button");

        resetButton.attr("disabled", disabled);
    }

    function updateOnOffButton(disabled) {
        var onOffButton = $(".js-clock-on-off-button");

        onOffButton.attr("disabled", disabled);
    }

    pomodoroApp.controller("ClockCtrl", ["$scope", "$interval", function($scope, $interval) {
        var intervalPromise = null;
        $scope.isTicking = false;
        $scope.timeLeft = defaultSessionTime*60*1000;
        $scope.clockSessionTime = defaultSessionTime;
        $scope.clockBreakTime = defaultBreakTime;
        $scope.onOffButtonText = "Start";
        $scope.isBreak = false;

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

                    if($scope.timeLeft <= 0)
                    {
                        if($scope.isBreak)
                        {
                            $scope.isTicking = false;
                            $scope.clockReset();
                            $scope.onOffButtonText = "Start";
                            updateResetButton(false);
                            updateOnOffButton(false);
                            $scope.isBreak = !$scope.isBreak;

                            $interval.cancel(intervalPromise);
                        }
                        else
                        {
                            $scope.timeLeft = $scope.clockBreakTime*60*1000;
                            $scope.onOffButtonText = "Start";
                            updateResetButton(true);
                            updateOnOffButton(true);
                            $scope.isBreak = !$scope.isBreak;

                        }
                    }
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