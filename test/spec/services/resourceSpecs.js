"use strict";
	describe('osm resource', function() {


		var osmResource;
		var $httpBackend;
		var $rootScope;
		var baseUrl = 'https://byui.brainhoney.com/Admin/'

		beforeEach(angular.mock.module('dlapApp'));

		beforeEach(inject(function($injector) {
			osmResource = $injector.get('dataResource');
			$httpBackend = $injector.get('$httpBackend');
			$rootScope = $injector.get('$rootScope');
		}));


		var Resource;

		beforeEach(function() {
			Resource = osmResource.newResource('my/resources');
		});


		test("get");
		test("delete");
		test("jsonp");
		test("head");
		testWithData("post");
		testWithData("put");


		function test(action) {
			describe('when issuing a ' + action + ' request without parameters', function() {
				var result;
				var item;

				describe('and it succeeds', function() {
					beforeEach(function() {
						item = { id: 42 };
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources').respond(item);
						result = Resource[action]();
						$httpBackend.flush();
					});

					it("should issue a " + action + " request", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});


					it("should return the result from the server", function() {
						result.then(function(serverItem) {
							expect(serverItem).toBe(item);
						});

					});
				});


				describe('when it fails', function() {
					beforeEach(function() {
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources').respond(500);
						result = Resource[action]();
						$httpBackend.flush();
					});

					it("should issue a " + action + " request", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});


					it("should reject the promise", function() {
						var failed;
						result.catch(function() {
							failed = true;
						});
						$rootScope.$apply();
						expect(failed).toBe(true);
					});
				});

				describe('when passing request parameters', function() {
					beforeEach(function() {
						item = { id: 42 };
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources?search=term').respond(item);
						result = Resource[action]({ search: 'term' });
						$httpBackend.flush();
					});

					it("should issue a " + action + " request with the search query parameters", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});
				});

				describe('when passing in an $http config object', function() {

					var data = { hello: 'world' };

					beforeEach(function() {
						item = { id: 42 };
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources?search=term', data).respond(item);
						result = Resource[action]({ search: 'term' }, { data: data });
						$httpBackend.flush();
					});

					it("should issue a " + action + " request taking account the config", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});
				});

				describe('when passing in an id as the first parameter', function() {

					beforeEach(function() {
						item = { id: 0 };
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources/0').respond(item);
						result = Resource[action](0);
						$httpBackend.flush();
					});

					it("should issue a " + action + " request appending the id to the url", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});
				});

				describe('when passing in a string as the first parameter', function() {

					beforeEach(function() {
						item = { id: 42 };
						$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources/new').respond(item);
						result = Resource[action]('new');
						$httpBackend.flush();
					});

					it("should issue a " + action + " request appending the id to the url", function() {
						$httpBackend.verifyNoOutstandingExpectation();
					});
				});

			});
		}
		
		function testWithData(action) {

			describe('when issuing a ' + action + 'request with data', function() {
				var item;
				var result;

				beforeEach(function() {
					item = { id: 42 };
					$httpBackend.expect(action.toUpperCase(), baseUrl+'my/resources', item).respond(200);
					result = Resource[action](item);
					$httpBackend.flush();
				});

				it("should " + action + " the object to the servber", function() {
					$httpBackend.verifyNoOutstandingExpectation();
				});

			});

		}
	});