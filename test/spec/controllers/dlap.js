'use strict';

describe('Controller: DlapCtrl', function () {

   var DlapCtrl,
    scope,
    dlapRepo,
    $httpBackend,
    $controller,
    $q, 
    $rootScope;
  var domain = { id: 1428365, name: 'Online Courses'};
  var domains = { response: { 'domains': { 'domain': [domain]}}};
  var course = { id: 1, title: 'Bio 100'};
  var courses = {response: {'courses': { 'course': [course]}}};
  var mockRepo = function(repository, method) {
      var call;
      inject(function($q, $rootScope) {
        call = $q.defer();
        call.resolveNow = function() {
          this.resolve.apply(this, arguments);
          $rootScope.$apply();
        };
        call.rejectNow = function() {
          this.reject.apply(this, arguments);
          $rootScope.$apply();

        };
        spyOn(repository, method).andReturn(call.promise);
      });
      return call;
    }
  
   // load the controller's module
  beforeEach(module('dlapApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      dlapRepo = $injector.get('dlapRepository');
      $httpBackend = $injector.get('$httpBackend');
      $controller = $injector.get('$controller');
      $q = $injector.get("$q");
      
  }));

   describe("when instantiating dlap controller", function() {
    var result;
    var domainCall;
    
    beforeEach( function() {
      scope = $rootScope.$new();
      domainCall = mockRepo(dlapRepo, "getDomains");
      
      DlapCtrl = $controller('DlapCtrl', {
        $scope: scope, dlapRepository: dlapRepo
      });
      domainCall.resolveNow(domains);
     
    });

    it("creates the controller", function() {
        expect(DlapCtrl).not.toBe(null);
      });   

    it('should get a list of domains', function () {
         expect(scope.domains.length).toBe(1);
      
    });
    
    describe("when a domain is selected", function() {
      var response;
      var courseCall;
      beforeEach( function() {
        courseCall = mockRepo(dlapRepo, "getCourseList");
        
        scope.getCourses(domain);
       
       courseCall.resolveNow(courses);
      });
    
      it('should get a list of courses for that domain', function () {
        expect(scope.courses.length).toBe(1);
      });
    });
  });
});
