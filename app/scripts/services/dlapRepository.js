'use strict';

angular.module('dlapApp')
.factory('dlapRepository', ['dataResource', '$q', function(dataResource, $q) {
    var Dlap = dataResource.newResource('Admin.ashx');
    var params = {};
    function resetParams() {
      params = {};
      params.format = 'JSON';
        params.callback = "JSON_CALLBACK";
        //return params;
    }

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
        resetParams();
        params.cmd = 'listdomains';
        params.domainid = 0;
        params.query = '/id in (1428365,15601242,17414961,10869190,1678022,1912820,2474683,2522027)';
        return Dlap.jsonp(params); 
      },
      getUser: function() {
        resetParams();
        params.cmd = 'getuser';
        return Dlap.jsonp(params);
        
      },
      getCourseList: function(domain) {
        $('#select2-drop, #s2id_courseSelect').css({'width': '600px'});
        resetParams();
        params.cmd = 'listcourses';
        params.domainid = domain.id;
        params.limit = 0;
        params.text = 'S14';
        return Dlap.jsonp(params);
      },

      getItemList: function(course) {
        resetParams();
        params.cmd = 'getitemlist';
        params.entityid = course.id;
        return Dlap.jsonp(params);
      },
      getCourseManifest: function(course) {
        resetParams();
        params.cmd = 'getmanifest';
        params.entityid = course.id;
        return Dlap.jsonp(params);
      },
      searchCourse: function(query, entityid, start){
        resetParams();
        params.cmd = 'search';
        params.entityid = entityid;
        params.query = query;
        params.rows = 25;
        params.start = start;
        return Dlap.jsonp(params);
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
  
