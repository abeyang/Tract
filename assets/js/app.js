/*	
Created by Abe Yang 5/21/2014

	Legend:
	+ cid = contact id
	+ nid = note id
	+ gid = group id
	+ tid = tag id

*/

// =========================================================================================================
//
// TRACT APP
//
// =========================================================================================================

'use strict';

var app = angular.module('app', ['ngSanitize', 'ui.router']);

// ROUTERS

/* app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {templateUrl: 'includes/dashboard.html', controller: 'DashboardController'})
	  .when('/contacts', {templateUrl: 'includes/contacts.html', controller: 'ContactsController'})
      .when('/contacts/:cid', {templateUrl: 'includes/contacts.html', controller: 'ContactsController'})
	  .when('/notes', {templateUrl: 'includes/notes.html', controller: 'NotesController'})
      .otherwise({redirectTo: '/'});
}]);*/

app.config(function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise("dashboard");
	
	// States
	$stateProvider

		// Dashboard
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'includes/dashboard.html',
			controller: 'DashboardController'
		})

		// Contacts
		.state('contacts', {
			url: '/contacts',
			templateUrl: 'includes/contacts.html',
			controller: 'ContactsController'
		})
		.state('contacts.notes', {
			url: '/:cid',
			templateUrl: 'includes/contacts.notes.html',
			controller: 'ContactNotesController'
		})

		// Notes
		.state('notes', {
			url: '/notes',
			templateUrl: 'includes/notes.html',
			controller: 'NotesController'
		})
/*	 .state('state1.list', {
	   url: "/list",
	   templateUrl: "includes/state1.list.html",
	   controller: function($scope) {
	     $scope.items = ["A", "List", "Of", "Items"];
	   }
	 })
	 .state('state2', {
	   url: "/state2",
	   templateUrl: "includes/state2.html"
	 })
	 .state('state2.list', {
	   url: "/list",
	     templateUrl: "includes/state2.list.html",
	     controller: function($scope) {
	       $scope.things = ["A", "Set", "Of", "Things"];
	     }
	   })*/
});

// CONTROLLERS

app.controller('DashboardController', function($scope, ui) {

	$scope.ui = ui;
	ui.setContext('dashboard');

	$scope.text = 'Dashboard Controller';
	// todo...

});

app.controller('ContactsController', function($scope, $stateParams, $state, ui, contactResource) {

	$scope.ui = ui;
	ui.setContext('contacts');
	
	$scope.contacts = contactResource.list();
	$scope.p = $stateParams;
	
	// @todo check if contacts.count > 0, and if so, find its first id 
	// (id doesn't have to be 0)
	
	// if (_.isEmpty($stateParams)) $state.go('contacts.notes', {cid: 0});

});

app.controller('ContactNotesController', function($scope, $stateParams, $state, ui, noteResource) {

	var cid = $stateParams.cid;
	ui.setContact(cid);
	
	$scope.notes = noteResource.filterByContactId(cid);

});


app.controller('NotesController', function($scope, ui) {

	$scope.ui = ui;
	ui.setContext('notes');
	
	$scope.text = 'Notes Controller';
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


// FACTORIES

app.factory('ui', function() {
	var context = 'dashboard';
	var contact = '';

	return {
		link: function(str) {
            return '#/' + str;
        },
        linkContact: function(id) {
        	return this.link('contacts/' + id);
        },
        getContext: function() { 
        	return context; 
        },
        setContext: function(str) { 
        	context = str; 
        },
        getContact: function() { 
        	return contact; 
        },
        setContact: function(str) { 
        	contact = str; 
        },
        findById: function(resource, id) {
        	return _.find(resource.list(), function(obj) {
                return obj.id == id;
            });
        }
	}
});

app.factory('contactResource', function() {
	/*  currently uses dummy data: 
		http://www.json-generator.com/

		[
		    '{{repeat(5)}}',
		    {
		        id: '{{index()}}',
		        first: '{{firstName()}}',
		        last: '{{surname()}}',
		        createTime: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
		        birthDate: '{{date(new Date(1993, 0, 1), new Date(), "YYYY-MM-dd")}}',
		        isArchived: '{{bool()}}',
		        groups: [
		            '{{repeat(1,5)}}',
		            '{{integer(0, 10)}}'
		        ]
		    }
		]
	*/

	var data = [
	    {
	        "id": 0,
	        "first": "Cathryn",
	        "last": "Fields",
	        "createdTime": "2014-05-17T08:34:13",
	        "birthDate": "2006-01-08",
	        "isArchived": false,
	        "groups": [
	            7,
	            1,
	            4
	        ]
	    },
	    {
	        "id": 1,
	        "first": "Cobb",
	        "last": "Cooper",
	        "createdTime": "2014-04-12T22:20:57",
	        "birthDate": "2000-04-28",
	        "isArchived": false,
	        "groups": [
	            0,
	            10,
	            7,
	            4
	        ]
	    },
	    {
	        "id": 2,
	        "first": "Morton",
	        "last": "Lawrence",
	        "createdTime": "2014-05-03T16:18:47",
	        "birthDate": "2005-08-09",
	        "isArchived": true,
	        "groups": [
	            2,
	            4,
	            6,
	            2,
	            7
	        ]
	    },
	    {
	        "id": 3,
	        "first": "Logan",
	        "last": "Holland",
	        "createdTime": "2014-02-16T14:39:54",
	        "birthDate": "2005-01-06",
	        "isArchived": false,
	        "groups": [
	            8,
	            4
	        ]
	    },
	    {
	        "id": 4,
	        "first": "Wilder",
	        "last": "Mcknight",
	        "createdTime": "2014-03-19T20:17:11",
	        "birthDate": "2000-03-31",
	        "isArchived": true,
	        "groups": [
	            0,
	            8,
	            9,
	            0
	        ]
	    }
	];

	return {
		list: function() {
			// add helpers
			return _.map(data, function(c) {
				c.name = c.first + ' ' + c.last;
				c.initials = c.first.substr(0,1) + c.last.substr(0,1);
				return c;
			});
		},
		findById: function(id) {
            return _.find(data, function(c) {
                return c.id == id;
            });
        }
	}
});

app.factory('noteResource', function() {
	/*  currently uses dummy data: 
		http://www.json-generator.com/
		
		[
		    '{{repeat(20)}}',
		    {
		        id: '{{index()}}',
		        cid: '{{integer(0, 4)}}',
		        content: '{{lorem(2, "paragraphs")}}',
		        createTime: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss")}}',
		        isFavorite: '{{bool()}}',
		        tags: [
		            '{{repeat(1,5)}}',
		            '{{integer(0, 10)}}'
		        ]
		    }
		]
	*/

	var data = [
	    {
	        "id": 0,
	        "cid": 3,
	        "content": "Dolore aute ex reprehenderit voluptate eiusmod. Aliquip culpa occaecat nulla culpa nisi aute laboris fugiat duis. Ex consequat mollit Lorem incididunt occaecat fugiat non et commodo. Excepteur voluptate et labore excepteur proident deserunt ullamco. Nostrud consequat ad cupidatat nostrud adipisicing dolor enim aliqua magna consectetur cillum in minim.\r\nOfficia labore nostrud reprehenderit cillum nostrud eiusmod. In proident dolore aliqua minim. Est magna id ex tempor anim deserunt pariatur enim esse amet. Consequat ea culpa laboris labore minim nisi ad minim irure cupidatat do non exercitation. Amet minim consectetur occaecat laboris nisi pariatur mollit veniam aliqua pariatur aliquip mollit cillum.\r\n",
	        "createTime": "2014-03-25T13:23:40",
	        "isFavorite": true,
	        "tags": [
	            5
	        ]
	    },
	    {
	        "id": 1,
	        "cid": 2,
	        "content": "Non cupidatat commodo qui adipisicing mollit consectetur. Consequat non irure laboris labore esse proident consequat. Proident exercitation ullamco veniam qui ipsum magna enim.\r\nSint laboris dolore laboris cupidatat fugiat. Consequat pariatur occaecat sit elit velit id laborum cupidatat est elit et et. Eu quis minim et laborum sint nulla adipisicing aute voluptate eu incididunt magna nulla. Laborum esse consectetur occaecat et adipisicing excepteur elit minim irure. Consectetur duis proident nulla anim voluptate id aute nulla cupidatat consequat aute sint Lorem dolor. Sit nulla cillum deserunt proident. Qui exercitation occaecat mollit duis cillum.\r\n",
	        "createTime": "2014-02-22T02:01:36",
	        "isFavorite": true,
	        "tags": [
	            1
	        ]
	    },
	    {
	        "id": 2,
	        "cid": 1,
	        "content": "Eu sit duis ad mollit anim consequat duis. Aliquip reprehenderit enim nostrud ad ipsum labore tempor deserunt occaecat exercitation culpa. Minim consectetur cupidatat aute consequat commodo qui ut anim dolor nulla adipisicing. Dolore esse dolor duis elit veniam veniam veniam est. Dolore do ullamco dolore sint veniam fugiat aute amet anim quis tempor amet aliquip. Amet cillum culpa sunt voluptate dolore et aliquip Lorem Lorem. Voluptate aliqua excepteur amet Lorem aute reprehenderit aliquip consequat.\r\nMagna ipsum quis occaecat aliqua aliquip occaecat irure enim dolore voluptate proident reprehenderit. Incididunt sint exercitation elit excepteur deserunt et. Excepteur eiusmod aliqua id laborum eiusmod veniam sit nulla nostrud est reprehenderit nostrud labore dolor. Culpa minim duis in sint nisi. Est ullamco labore magna occaecat. Consequat proident amet quis consectetur aute. Veniam duis ullamco ipsum magna culpa nulla deserunt esse et ad cillum quis.\r\n",
	        "createTime": "2014-04-24T10:48:37",
	        "isFavorite": false,
	        "tags": [
	            7,
	            10,
	            9,
	            3
	        ]
	    },
	    {
	        "id": 3,
	        "cid": 3,
	        "content": "Incididunt aliquip eu consectetur sint deserunt dolore. Esse amet sint fugiat eu fugiat. Mollit in veniam culpa voluptate non laboris ea ullamco aliqua elit qui. Qui consequat incididunt sint Lorem irure. Consequat laboris deserunt ut aliqua non irure. Commodo ex velit cupidatat esse elit consequat irure qui consectetur id. Nulla qui elit ut laborum id aute.\r\nVelit elit sunt excepteur quis amet pariatur anim magna laboris eiusmod esse qui sint commodo. Sint velit occaecat eiusmod ullamco quis nisi elit. Qui nostrud reprehenderit officia deserunt qui aute elit ad elit. Occaecat fugiat irure tempor non nostrud. Minim quis consectetur eiusmod laboris amet deserunt enim voluptate fugiat. Sit laboris qui nostrud deserunt sunt do. Irure non sint mollit duis laboris duis nisi ea minim.\r\n",
	        "createTime": "2014-03-20T04:47:09",
	        "isFavorite": true,
	        "tags": [
	            10,
	            9,
	            7,
	            1,
	            10
	        ]
	    },
	    {
	        "id": 4,
	        "cid": 0,
	        "content": "Dolore irure id id laboris id mollit nisi. Quis magna do ea voluptate voluptate sint Lorem culpa ipsum est amet. Est consequat pariatur labore quis amet est sit veniam duis. Exercitation Lorem adipisicing fugiat nisi officia velit quis irure adipisicing ad. Cupidatat sint dolore ullamco occaecat non deserunt fugiat in magna nisi. Proident veniam incididunt ut consectetur commodo laboris qui officia reprehenderit irure. Id aute Lorem in reprehenderit laboris ex.\r\nEiusmod non adipisicing amet exercitation. Minim est consequat nulla nulla pariatur eiusmod voluptate ut deserunt nostrud eiusmod deserunt. Excepteur nisi occaecat consequat aute. Id voluptate nulla cillum deserunt. Sint sint occaecat duis duis pariatur id occaecat excepteur est Lorem sint elit proident. Tempor anim quis duis veniam enim ad. Dolore dolore amet eu eu cillum dolor incididunt anim.\r\n",
	        "createTime": "2014-04-11T00:17:05",
	        "isFavorite": true,
	        "tags": [
	            9,
	            7,
	            9,
	            6,
	            3
	        ]
	    },
	    {
	        "id": 5,
	        "cid": 4,
	        "content": "Esse consequat veniam nisi proident tempor tempor Lorem laborum in ex cupidatat pariatur. Nostrud ullamco adipisicing in nostrud nulla elit est. Consectetur nisi esse nisi pariatur sit proident id nostrud ullamco nisi do commodo. Sint pariatur cillum cillum consectetur culpa cillum culpa consequat laborum magna ullamco id eu.\r\nOfficia quis amet nisi pariatur eu dolore nisi eu ex nisi dolore eu adipisicing cillum. Excepteur magna culpa quis excepteur deserunt consequat tempor. Eu proident magna laborum adipisicing ullamco qui amet nisi. Sint laborum veniam minim id dolor ullamco adipisicing enim amet aliquip aliquip consequat amet. Sit cillum magna anim cillum velit ullamco nulla qui. Enim et esse adipisicing dolore velit excepteur duis velit eiusmod. Eu elit nostrud irure do sunt sint anim.\r\n",
	        "createTime": "2014-05-13T14:49:13",
	        "isFavorite": false,
	        "tags": [
	            6,
	            0
	        ]
	    },
	    {
	        "id": 6,
	        "cid": 4,
	        "content": "Amet esse sunt adipisicing tempor aliquip nulla ea deserunt. Adipisicing ullamco est officia consectetur ex ipsum enim. Voluptate ullamco laborum ullamco culpa quis mollit minim anim ipsum ullamco cillum. Reprehenderit cupidatat cupidatat reprehenderit occaecat. Culpa voluptate adipisicing cillum incididunt ullamco tempor irure ullamco sit eu officia.\r\nDo quis non velit et velit laboris cupidatat. Exercitation anim commodo voluptate labore laborum enim culpa consequat veniam quis ex duis. Laborum consequat officia sint dolor consequat est ea esse cillum in magna.\r\n",
	        "createTime": "2014-04-04T03:19:37",
	        "isFavorite": false,
	        "tags": [
	            6,
	            8,
	            8,
	            5
	        ]
	    },
	    {
	        "id": 7,
	        "cid": 4,
	        "content": "Veniam proident tempor adipisicing labore. Laboris eu laboris anim officia aliquip mollit. Voluptate amet irure amet qui ad est dolor deserunt. Enim velit irure nostrud quis officia commodo laborum nostrud ipsum culpa occaecat. Amet et do nisi est reprehenderit culpa Lorem qui minim ut commodo excepteur ipsum reprehenderit. Voluptate adipisicing nulla consectetur ex eiusmod nulla ea enim.\r\nVoluptate quis labore consectetur sint nisi ex do nostrud do aliquip est fugiat eu. Dolor non dolor ullamco cillum officia magna sit irure voluptate consequat ex minim. Sunt irure in enim enim qui voluptate culpa Lorem culpa adipisicing nostrud duis enim labore. In ullamco cillum dolor occaecat dolore velit ut tempor ipsum officia quis ad. Ea laboris eu exercitation aliqua eiusmod. Incididunt laborum eu consequat reprehenderit cupidatat pariatur est aliqua deserunt. Ex cillum officia consequat dolor sunt qui mollit laborum aliquip cupidatat adipisicing aute esse.\r\n",
	        "createTime": "2014-03-18T08:06:54",
	        "isFavorite": true,
	        "tags": [
	            2
	        ]
	    },
	    {
	        "id": 8,
	        "cid": 0,
	        "content": "Esse exercitation aliquip qui aliquip deserunt est minim reprehenderit quis. Cillum eiusmod in occaecat laborum et anim do anim sunt ipsum deserunt ut. Laborum Lorem elit do laboris pariatur pariatur. Eiusmod consectetur elit fugiat magna et ea.\r\nAmet ex non excepteur cillum eu officia ut eu in commodo exercitation occaecat exercitation cillum. Sunt ipsum nisi do occaecat esse irure irure aliqua magna enim reprehenderit duis velit. Quis proident sit ipsum excepteur occaecat est quis incididunt.\r\n",
	        "createTime": "2014-01-16T16:33:50",
	        "isFavorite": true,
	        "tags": [
	            1
	        ]
	    },
	    {
	        "id": 9,
	        "cid": 1,
	        "content": "Deserunt cillum proident veniam sunt id laboris deserunt laboris quis reprehenderit reprehenderit officia quis amet. Incididunt est excepteur do irure Lorem ut sunt incididunt. Do aute voluptate irure veniam magna enim quis duis consectetur. Sint ipsum duis esse ea proident elit tempor irure sunt non tempor.\r\nConsequat laborum Lorem anim irure deserunt cupidatat dolore anim enim pariatur fugiat tempor. Deserunt sint elit voluptate amet. Duis sint culpa dolor nisi sint cillum in deserunt adipisicing.\r\n",
	        "createTime": "2014-02-09T18:04:56",
	        "isFavorite": false,
	        "tags": [
	            3,
	            1,
	            1,
	            6
	        ]
	    },
	    {
	        "id": 10,
	        "cid": 3,
	        "content": "Sit ipsum velit sit incididunt ut culpa sint do aliqua tempor. Eiusmod cillum aliquip mollit ea fugiat culpa non cillum tempor consectetur do ipsum nisi. Ex reprehenderit culpa culpa laborum adipisicing irure aliqua velit proident eu ex ex eu ex. Consectetur sit in quis ullamco.\r\nSint dolor non sunt deserunt minim pariatur ex officia et duis consectetur aliquip. Mollit aliqua est veniam est nulla non laboris in adipisicing commodo incididunt consequat. Do commodo Lorem ad pariatur ullamco voluptate magna quis laboris amet. Culpa Lorem qui dolor laborum ullamco ullamco in Lorem deserunt enim cillum aliqua non pariatur. Aliquip cupidatat dolore cillum eiusmod aliqua sunt cillum reprehenderit ex in id.\r\n",
	        "createTime": "2014-01-12T18:04:29",
	        "isFavorite": true,
	        "tags": [
	            0
	        ]
	    },
	    {
	        "id": 11,
	        "cid": 2,
	        "content": "Aute enim deserunt dolor excepteur dolor labore sint aliqua elit. Deserunt consectetur eiusmod magna culpa voluptate velit. Exercitation sit sint eiusmod nostrud dolore labore proident aliqua incididunt voluptate. Fugiat qui excepteur dolor voluptate aliqua nostrud laborum fugiat eu nulla anim amet laborum. Nisi sunt officia velit nisi quis ad sint ex voluptate. Anim laborum deserunt commodo adipisicing tempor mollit dolor adipisicing cupidatat. Enim pariatur non ad officia reprehenderit id anim.\r\nNon veniam quis est laboris. Id occaecat exercitation dolore voluptate id magna deserunt reprehenderit laboris. Cillum ad cupidatat nulla cillum.\r\n",
	        "createTime": "2014-01-12T18:37:16",
	        "isFavorite": true,
	        "tags": [
	            10,
	            2,
	            8,
	            0,
	            7
	        ]
	    },
	    {
	        "id": 12,
	        "cid": 3,
	        "content": "Cillum mollit qui anim anim commodo non nostrud do exercitation consectetur ipsum. Sunt magna cillum duis aute esse nisi id aliqua. Ex do eu aute aliqua non ad tempor laborum mollit aliqua in nulla. Cillum sint amet labore sit cupidatat laborum et commodo aliquip amet nostrud ut enim. Lorem commodo enim elit aliquip voluptate sunt veniam magna exercitation cillum. Enim magna aliqua laborum do velit ut aliquip aliquip cupidatat ut sunt sint commodo.\r\nSint aute commodo consectetur esse veniam fugiat consequat. Dolore incididunt sint irure do pariatur ipsum reprehenderit sint. Anim tempor consequat elit duis labore non. Deserunt laborum in pariatur exercitation incididunt voluptate ipsum occaecat Lorem.\r\n",
	        "createTime": "2014-03-18T20:49:59",
	        "isFavorite": false,
	        "tags": [
	            2,
	            5,
	            2,
	            9,
	            10
	        ]
	    },
	    {
	        "id": 13,
	        "cid": 2,
	        "content": "Nisi reprehenderit irure incididunt ut cupidatat est eu. Excepteur ipsum do officia dolor quis qui. Quis id ad ullamco aliqua. Nisi magna aute mollit tempor id. Officia eu aliqua adipisicing mollit. Cillum elit duis pariatur minim sunt quis reprehenderit duis.\r\nLaboris officia fugiat labore enim aliqua cupidatat enim. Excepteur aute non irure labore aute ex id aliquip et et do minim ut. Nostrud aliquip nostrud voluptate dolore non duis aute Lorem cupidatat anim culpa adipisicing. Aliqua nulla dolor mollit nulla ea sit pariatur commodo id esse culpa velit nulla. In deserunt laboris pariatur adipisicing laborum officia irure amet veniam elit officia.\r\n",
	        "createTime": "2014-01-01T05:44:53",
	        "isFavorite": true,
	        "tags": [
	            3,
	            10,
	            8,
	            4
	        ]
	    },
	    {
	        "id": 14,
	        "cid": 4,
	        "content": "Deserunt amet elit id sunt nostrud ea sunt officia id quis magna aliquip. Do occaecat nostrud occaecat fugiat laboris enim aliquip enim sunt magna ullamco. Nisi et esse nostrud commodo aliqua amet tempor amet laborum et. Mollit adipisicing laboris ullamco laborum cupidatat sint elit proident tempor mollit do adipisicing. Ad ex ea amet labore sit fugiat do. Eu occaecat voluptate ex amet laborum dolore non enim.\r\nCommodo duis officia ea commodo non qui quis ullamco fugiat ullamco. Cillum aliqua ipsum adipisicing ipsum nostrud eiusmod officia laborum enim duis elit nulla. Laborum incididunt consequat laboris ea nostrud anim est laboris irure magna. Pariatur in pariatur nostrud cupidatat cupidatat nostrud ex anim consectetur adipisicing aliqua non et magna.\r\n",
	        "createTime": "2014-03-31T23:08:13",
	        "isFavorite": false,
	        "tags": [
	            9,
	            3
	        ]
	    },
	    {
	        "id": 15,
	        "cid": 1,
	        "content": "Et do laboris eiusmod est elit esse. Minim aute est adipisicing occaecat mollit anim ipsum non ad aute adipisicing. Nulla tempor proident et nostrud sit cupidatat ipsum nostrud dolore cupidatat occaecat Lorem sint. Laboris quis ad Lorem labore occaecat eiusmod consequat do fugiat voluptate in cupidatat ea occaecat. Duis nostrud eiusmod ullamco esse tempor aute nostrud minim enim. Anim laborum do proident ea qui cillum exercitation reprehenderit elit ut cupidatat id non.\r\nVeniam pariatur anim aute irure reprehenderit deserunt. Adipisicing quis anim culpa amet occaecat dolore elit nisi ex cillum. Sunt minim ad cupidatat laborum laborum minim eu ad nulla laborum officia exercitation in. Voluptate consequat dolore elit do aliquip exercitation excepteur aliquip veniam occaecat.\r\n",
	        "createTime": "2014-04-13T12:29:04",
	        "isFavorite": true,
	        "tags": [
	            1
	        ]
	    },
	    {
	        "id": 16,
	        "cid": 1,
	        "content": "Dolor non magna consequat ullamco in et. Lorem voluptate eu eiusmod fugiat culpa nostrud incididunt fugiat voluptate id sint. Sunt esse elit aute commodo ex irure laborum ullamco. Excepteur cupidatat est sit duis sit eiusmod. Eiusmod nisi nulla sunt exercitation deserunt. Deserunt magna in occaecat quis voluptate non.\r\nProident cillum veniam aliquip ex cupidatat occaecat et sunt deserunt cupidatat do aliquip. Do nulla reprehenderit quis nisi culpa nostrud esse. Adipisicing deserunt pariatur nisi sint amet quis dolor ut sint laborum aliqua cupidatat. Aute eiusmod irure reprehenderit sit ut. Ex pariatur velit ullamco sit nostrud cillum ad. Nisi labore esse aute incididunt. Ex exercitation quis enim exercitation veniam id magna ut Lorem proident ad.\r\n",
	        "createTime": "2014-01-16T10:40:59",
	        "isFavorite": true,
	        "tags": [
	            5
	        ]
	    },
	    {
	        "id": 17,
	        "cid": 2,
	        "content": "Ut commodo tempor mollit nulla in officia sit qui. Sunt laborum cillum exercitation aute sint. Nisi irure et Lorem cillum ex et eiusmod laborum laborum eiusmod est adipisicing tempor. Eiusmod quis exercitation fugiat do ut irure consectetur sint consequat occaecat pariatur. Officia ut pariatur laboris ex Lorem aliqua veniam anim.\r\nEst consectetur ullamco esse excepteur et. Ut duis fugiat minim ad sit. Minim irure esse magna voluptate sit nisi non duis commodo.\r\n",
	        "createTime": "2014-04-01T23:36:42",
	        "isFavorite": true,
	        "tags": [
	            4
	        ]
	    },
	    {
	        "id": 18,
	        "cid": 3,
	        "content": "Ex do ad labore commodo sunt sunt laboris ad duis occaecat nostrud excepteur. Esse qui ad irure et eiusmod ex deserunt enim commodo aliquip veniam. Consequat sit incididunt do enim sit deserunt Lorem laboris sit est consectetur commodo.\r\nFugiat laborum ipsum laborum reprehenderit ad quis enim. Non minim exercitation aute officia veniam adipisicing ullamco duis irure amet consequat voluptate. Ex duis cupidatat veniam esse id.\r\n",
	        "createTime": "2014-01-31T14:18:22",
	        "isFavorite": false,
	        "tags": [
	            2,
	            1,
	            5
	        ]
	    },
	    {
	        "id": 19,
	        "cid": 0,
	        "content": "Elit aliqua irure non ea ea dolor commodo adipisicing anim pariatur ut dolore. Incididunt elit amet veniam veniam laboris cillum aliqua qui. Sunt nisi exercitation tempor ea sit incididunt incididunt id proident exercitation. Ea dolore ex laboris incididunt. Veniam officia ex reprehenderit mollit ut dolore adipisicing veniam.\r\nEu elit occaecat adipisicing velit ipsum sit mollit adipisicing adipisicing in. Ex non nostrud exercitation id ad exercitation mollit ex id aliqua. Pariatur est et adipisicing non consequat sunt aliquip nulla ex est magna nulla aliquip labore. Nulla non proident nostrud nisi aliqua esse Lorem. Est sint culpa sunt nostrud commodo aliquip Lorem elit velit adipisicing ad.\r\n",
	        "createTime": "2014-05-15T06:39:06",
	        "isFavorite": false,
	        "tags": [
	            1
	        ]
	    }
	];

	return {
		list: function() {
			return data;
		},
		findById: function(id) {
            return _.find(data, function(n) {
                return n.id == id;
            });
        },
        filterByContactId: function(cid) {
			return _.filter(data, function(n) {
        		return n.cid == cid;
        	});
        },
	}
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
*/

// =========================================================================================================
//
// JQUERY
//
// =========================================================================================================

$(document).ready(function(){
  
  // Write your Javascript!

});