/**
 * app Module
 *
 * Description
 */
angular.module('lttree', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('/treeView.html',
        '<div class="dropout" ng-click="show=false"></div>' +
        ' <input class="form-control row" id="treeview" ng-focus="show=true" ng-model="keyword"/>' +
        '<ul  ng-focus="show=true" ng-if="show" class="tree-view">' +
        '<li ng-repeat="(key,item) in treeData" ng-init="item.textObj=textobj(item)" ng-include="\'/treeItem.html\'" ></li>' +
        '</ul>'
    );
    $templateCache.put('/treeItem.html',
        '<a class="subitem" ng-class="{\'subli\':!item.children}" ng-bind="item.text" ng-click="endReturn(item,$event)"  ng-show="keyordShow(keyword,item.textObj)"></a>' +
        '<ul  >' +
        '<li ng-init="item.textObj=textobj(item)"   ng-show="keyordShow(keyword,item.textObj)" ng-repeat="(key,item) in item|addText"  ng-include="\'/treeItem.html\'">' +
        '</li>' +
        '</ul>'
    );
}]).directive('treeView', [function () {

    return {
        restrict: 'E',
        templateUrl: '/treeView.html',
        scope: {
            treeData: '=',
            returnData: '='

        },
        controller: ['$scope', function ($scope) {
            $scope.keyordShow = function (keyword, text, item, key) {
                if (!keyword || text.indexOf(keyword) >= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            $scope.textobj = function (item, father) {
                var text = "";
                if (item.children) {
                    for (var x in item.children) {
                        text += $scope.textobj(item.children[x]);
                    }
                }
                text = text + item.text + item.fatherText;
                return text;
            }
            $scope.endReturn = function (item, $event) {
                $event.stopPropagation();

                $scope.show = true;

                $scope.keyword = item.text;
                $scope.returnData = item;
                $scope.show = false;

            }
        }]

    };
}]).filter("addText", function () {
    return function (item) {
        for (var x in item.children) {
            item.children[x].fatherText = item.text + item.fatherText;
        }
        return item.children;
    }
});