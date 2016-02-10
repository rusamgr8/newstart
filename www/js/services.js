angular.module('app.services', [])

.factory('ClassRef', ['$firebaseArray',function($firebaseArray){
		var classRef = new Firebase("https://classup.firebaseio.com/classes");
  		return $firebaseArray(classRef);
}])

.service('BlankService', [function(){

}]);

