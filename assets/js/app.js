/*	
Created by Abe Yang 5/21/2014
*/

// =========================================================================================================
//
// ANGULAR MAGIC
//
// =========================================================================================================

'use strict';

var app = angular.module('app', ['ngSanitize', 'ngRoute']);

// ROUTERS

 app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {templateUrl: 'includes/dashboard.html', controller: 'DashboardController'})
	  .when('/contacts', {templateUrl: 'includes/contacts.html', controller: 'ContactsController'})
      .when('/tasks/:taskId', {templateUrl: 'includes/task-detail.html', controller: 'ContactsController'})
      .otherwise({redirectTo: '/'});
}]);

// CONTROLLERS

app.controller('DashboardController', function($scope, ui) {

	$scope.ui = ui;
	ui.setContext('dashboard');

	$scope.text = 'Dashboard Controller';
	// todo...

});

app.controller('ContactsController', function($scope, ui) {

	$scope.ui = ui;
	ui.setContext('contacts');
	
	$scope.text = 'Contacts Controller';
	// todo...

});

/* MOC controller */

/*app.controller('MocController', function($scope, $location, mocResource, tagResource, statusResource, metaResource) {

	$scope.mocs = mocResource.list();
	$scope.statii = statusResource.list();
	
	var id = getIdFromUrl($location);
	$scope.single = mocResource.findById(id);

	$scope.getTagNames = function(tags) {
		// tags is an array of tag id's
		var str = '';

		_.each(tags, function(id) {
			str += tagResource.findNameById(id) + ', ';
		});

		return str.substring(0, str.length-2);		// remove the final ", " in str
	};

	$scope.getStatus = function(status) {
		return statusResource.findNameById(status);
	};

	$scope.getTitle = function(id) {
		return metaResource.findTitleById(id);
	};

	$scope.getRatings = function(id) {
		return mocResource.ratingsById(id);
	};

	$scope.selectCount = function() {
		return mocResource.findSelected().length;	
	};

	$scope.selectNone = function() {
		var mocs = mocResource.findSelected();
		_.each(mocs, function (moc) {
			moc.selected = '';
		});
	}

	$scope.filterCards = {
		status: 0
	};

});*/

/* Tag controller */
/*
app.controller('TagsController', function($scope, $location, tagResource) {

	$scope.tags = tagResource.list();

	$scope.tagOrder = '-count';		// default tag order: sort by popularity

	$scope.max = tagResource.maxCount();

});

app.controller('TagController', function($scope, $location, mocResource, tagResource, metaResource) {

	var id = getIdFromUrl($location);
	$scope.tag = tagResource.findById(id);

	$scope.mocs = mocResource.filterByTagId(id);

	$scope.getTitle = function(id) {
		return metaResource.findTitleById(id);
	};
	$scope.getRatings = function(id) {
		return mocResource.ratingsById(id);
	};

});
*/


// FACTORIES

app.factory('ui', function() {
	var context = 'dashboard';

	return {
		link: function(str) {
            return '#/' + str;
        },
        getContext: function() { 
        	return context; 
        },
        setContext: function(str) { 
        	context = str; 
        }

	}
});

/* currently uses dummy data */
app.factory('contactResource', function() {
	// http://www.json-generator.com/
	/*
		[
		    '{{repeat(10)}}',
		    {
		        id: '{{index()}}',
		        first: '{{firstName()}}',
		        last: '{{surname()}}',
		        content: '{{lorem(1, "paragraphs")}}',
		        createdTime: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
		        birthDate: '{{date(new Date(1997, 0, 1), new Date(), "YYYY-MM-dd")}}',
		        status: '{{integer(0, 4)}}',
		        groups: [
		            '{{repeat(1,5)}}',
		            '{{integer(0, 20)}}'
		        ]
		    }
		]
	*/
});

/*
app.factory('tagResource', function () {

	var data = [
		{id:0,	tagname:"Ship",		count: 56},
		{id:1,	tagname:"Red",		count: 1},
		{id:2,	tagname:"Brown",	count: 3},
		{id:3,	tagname:"Black",	count: 49},
		{id:4,	tagname:"White",	count: 34},
		{id:5,	tagname:"Plane",	count: 52},
		{id:6,	tagname:"Boat",		count: 21},
		{id:7,	tagname:"House",	count: 19},
		{id:8,	tagname:"Horse",	count: 7},
		{id:9,	tagname:"Dog",		count: 41},
		{id:10,	tagname:"Cat",		count: 86},
		{id:11,	tagname:"Mouse",	count: 37},
		{id:12,	tagname:"Hamster",	count: 45},
		{id:13,	tagname:"Thing",	count: 11},
		{id:14,	tagname:"Purple",	count: 15},
		{id:15,	tagname:"Blue",		count: 17},
		{id:16,	tagname:"Sweet",	count: 2},
		{id:17,	tagname:"Console",	count: 5},
		{id:18,	tagname:"Eagle",	count: 8},
		{id:19,	tagname:"Mecha",	count: 33},
		{id:20,	tagname:"Robot",	count: 52}
	];
	
	return {
		list: function() {
			return data;
		},
		findById: function(id) {
            return _.find(data, function (moc) {
                return moc.id == id;
            });
        },
		findNameById: function(id) {
            var t = _.find(data, function (tag) {
                return tag.id == id;
            });

            return t.tagname;
        },
        maxCount: function() {
        	var t = _.max(data, function(tag){ return tag.count; });
        	return t.count;
        }
	}
});

app.factory('statusResource', function () {

	var data = [
		{id:0,	name:"New"},	
		{id:1,	name:"Pending"},
		{id:2,	name:"Approved"},
		{id:3,	name:"Rejected"},
		{id:4,	name:"Featured"}
	];
	
	return {
		list: function() {
			return data;
		},
		findNameById: function(id) {
            var s = _.find(data, function (status) {
                return status.id == id;
            });

            return s.name;
        }
	}
});

app.factory('metaResource', function () {

	var data = [
		{id:0,	title:"The Fail Whale"},
		{id:1,	title:"Hogwarts Castle"},
		{id:2,	title:"This is the Captain Speaking"},
		{id:3,	title:"The Kingdom of Super Bite-Sized Tiny Little Lego People of Hobbitton"},
		{id:4,	title:"My Little Typewriter"},
		{id:5,	title:"Tank in Snow"},
		{id:6,	title:"The Gray Battalion"},
		{id:7,	title:"Shelob"},
		{id:8,	title:"USS Enterprise"},
		{id:9,	title:"The White Crane"},
		{id:10,	title:"Mecha of Doom"},
		{id:11,	title:"R2D2, where are you?"},
		{id:12,	title:"Crows Landing"},
		{id:13,	title:"Blockheads"},
		{id:14,	title:"2001: Space Odyssey"},
		{id:15,	title:"Bomber Plane"},
		{id:16,	title:"Assimilation is Inevitable"},
		{id:17,	title:"Cancer is in my DNA"},
		{id:18,	title:"Polly wants a cracker!"},
		{id:19,	title:"Alice in Wonderland"},
	];
	
	return {
		list: function() {
			return data;
		},
		findById: function(id) {
            return _.find(data, function (moc) {
                return moc.id == id;
            });
        },
		findTitleById: function(id) {
            var meta = this.findById(id%data.length);
            return meta.title;
        }
	}
});
*/

// =========================================================================================================
//
// JQUERY
//
// =========================================================================================================

$(document).ready(function(){
  
  // Write your Javascript!

});