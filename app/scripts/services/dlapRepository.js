'use strict';

angular.module('dlapApp')
.factory('dlapRepository', ['dataResource', '$q', function(dataResource, $q) {
    var Dlap = dataResource.newResource('Admin.ashx');
    


    var cache;

    function getFromCache(termId) {
      var defered = $q.defer();
      if (cache) {
        cache.then(function(projects) {
          var term = _.find(projects, function(project) {
            return project.id == projectId;
          });
          if (project) {
            defered.resolve(project);
          } else {
            defered.reject();
          }
        });
      } else {
        defered.reject();
      }
      return defered.promise;
    }


    return {
      Dlap: Dlap,
      getDomains: function() {
        return Dlap.jsonp({cmd: 'listdomains', domainid: 0, query: '/id in (1428365,15601242,17414961,10869190,1678022,1912820,2474683,2522027)' }); 
      },
      getUser: function() {
        return Dlap.jsonp({cmd: 'getuser'});
        
      },
      getCourseList: function(domain) {
        return Dlap.jsonp({cmd: 'listcourses', domainid: domain.id});
      },

      getItemList: function(course) {
        return Dlap.jsonp({cmd: 'getitemlist', entityid: course.id});
      },
      getCourseManifest: function(course) {
        return Dlap.jsonp({cmd: 'getmanifest', entityid: course.id});
      },
      
      save: function(project) {
        if (project.id) {
          return Projects.put(term.id, project);
        } else {
          return Projects.post(project);
        }
      },
      delete: function(project) {
        return Projects.delete(project.id);
      }
    };
  }]);
  
