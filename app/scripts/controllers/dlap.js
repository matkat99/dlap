'use strict';

angular.module('dlapApp')
  .controller('DlapCtrl', function ($scope, dlapRepository, $stateParams) {
        $scope.domain = {};
        $scope.domains = [];
        $scope.course = {};
        $scope.courses = [];
        $scope.courseItems = [];
        $scope.courseManifest = {};
        $scope.courseid;
        $scope.pred = "Test";
        $scope.revers = false;
        $scope.method = 'jsonp';
       

      //dlapRepository.getUser().then(function(data){
      //  $scope.dlap = data;
      //});
      dlapRepository.getDomains().then(function(data){
        $scope.domains = data.response.domains.domain;
      });

      
      $scope.getCourses = function(domain) {
        dlapRepository.getCourseList(domain).then(function(data) {
          $scope.courses = data.response.courses.course;
        })
      };

      var getCourseItems = function(course) {
        dlapRepository.getItemList(course).then(function(data) {
          $scope.courseItems = data.response;
        })
      };
      var getCourseManifest = function(course) {
        dlapRepository.getCourseManifest(course).then(function(data) {
          $scope.courseManifest = data.response.manifest;
        })
      };

      $scope.$watch('domain', function (newVal, oldval) {
      if (newVal != oldval) {
          $scope.getCourses(newVal);
        
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


});


