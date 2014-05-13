'use strict';
angular.module('dlapApp').controller('DlapCtrl', function($scope, $http, $stateParams, dlapRepository) {
    $scope.tex = $stateParams.dept;
    $scope.domain = {};
    $scope.course = {};
    $scope.courses = [];
    $scope.courseItems = [];
    $scope.courseManifest = {};
    $scope.courseid;
    $scope.pred = "Test";
    $scope.revers = false;
    $scope.method = 'jsonp';
    // $scope.url = "https://docs.google.com/spreadsheet/tq?tqx=responseHandler:JSON_CALLBACK&key=0AmTWFwG73UaldEV1Qy1HdkN6TFg3YVNDUWVzWVA3S2c&single=true&gid=0&headers=1&tq=select%20A,B,C,D,H,I,M,N,O,AA";//%20where%20D='".$stateParams.dept."'";
    $scope.url = "https://byui.brainhoney.com/Admin/Admin.ashx?cmd=getuser&_format=JSON&_callback=JSON_CALLBACK";
    //$scope.fetch = function (){
    // $http.defaults.headers.common.Origin = 'http:localhost:8888';
    $http({
        method: $scope.method,
        url: $scope.url
    }).
    success(function(data, status) {
        $scope.status = status;
        $scope.data = data; //$scope.buildTable(data);
    }).
    error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
    });
    dlapRepository.getUser().then(function(data) {
        $scope.dlap = data;
    });
    dlapRepository.getDomains().then(function(data) {
        $scope.domains = data.response.domains.domain;
    });
    dlapRepository.getDomains().then(function(data) {
        $scope.domains = data.response.domains.domain;
    });
    var getCourses = function(domain) {
            dlapRepository.getCourseList(domain).then(function(data) {
                $scope.courses = data.response.courses.course;                
            })
        };
    var getCourseItems = function(course) {
            dlapRepository.getItemList(course).then(function(data) {
                $scope.courseItems = data.response.items.item; 
            })
        };
    var getCourseManifest = function(course) {
            dlapRepository.getCourseManifest(course).then(function(data) {
                $scope.courseManifest = data.response.manifest;
            })
        };
    $scope.$watch('domain', function(newVal, oldval) {
        if (newVal != oldval) {
            getCourses(newVal);
        }
    });
    $scope.$watch('course', function(newVal, oldval) {
        if (newVal != oldval) {
            //getCourseManifest(newVal);
            getCourseItems(newVal);
            $scope.courseid = newVal;
        }
    });

    $scope.query = function(query){
      dlapRepository.searchCourse(query, $scope.courseid, 0).then(function(data) {
          var n = 0;
      })
    }

    //};
    $scope.buildTable = function(results) { //callback to clean up data returned from the google doc
        var data = results.table;
        var temp = {};
        var newData = {};
        var j = 0;
        $.each(data.rows, function(key, value) {
            var i = 0;
            temp = {};
            $.each(data.cols, function(ckey, cvalue) {
                var label = cvalue['label'].replace(' ', '');
                if (typeof value['c'][i] === "undefined") temp[label] = '';
                else {
                    if (typeof value['c'][i]['f'] !== "undefined") temp[label] = value['c'][i]['f'];
                    else temp[label] = value['c'][i]['v'];
                }
                //console.log(label);
                i++;
            })
            //console.log(temp);
            if (temp['Course'] != "") newData[j] = temp;
            j++;
        });
        data = newData;
        //console.log(data);
        return data;
    }
});

