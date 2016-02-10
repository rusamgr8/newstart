angular.module('app.controllers', [])
  

 //LoginController
 

.controller('loginCtrl', function($scope,$state) {
	$scope.user = {};
	$scope.authenticateUser = function() {
		console.log("inside authenticateUser function");
		var ref = new Firebase("https://classup.firebaseio.com");
		ref.authWithPassword({
  		email    : $scope.user.email,
  		password : $scope.user.password
	}, function(error, authData) {
  	if (error) {
    console.log("Login Failed!", error);
  	} else {
  		$state.go("menu.classUp");
    console.log("Authenticated successfully with payload:", authData);
  }
});
	}
})


//LogoutController


 .controller('logoutCtrl', function($scope,$ionicHistory) {
 	 $ionicHistory.clearHistory();
})



 // SignUp Controller




.controller('signupCtrl', function($scope,$state) {
	$scope.user = {};
	$scope.createUser = function() {
		var ref = new Firebase("https://classup.firebaseio.com");
ref.createUser({
  name	   : $scope.user.name,
  email    : $scope.user.email,
  password : $scope.user.password
}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } else {
  	authenticateUser();
  	$state.go("menu.classUp");
    console.log("Successfully created user account with uid:", userData.uid);
  }
});
	}
})
      


//ClassUpController - Main page where lists of all classes is available also option of searching classes




.controller('classUpCtrl', function($scope,ClassRef,$ionicHistory) {
	 $ionicHistory.clearHistory();
	$scope.myclasses = ClassRef;
	console.log($scope.myclasses);
})
   


//Create new Class and gives control to class profile page
 

.controller('createClassCtrl', function($scope,$state) {
	$scope.myclass = {};

	console.log('inside createClassCtrl');
		var classRef = new Firebase("https://classup.firebaseio.com/classes");
		
		console.log($scope.myclass.level);
		$scope.createClass = function() {
			console.log($scope.myclass);
			console.log('before pushing data');
			var addedClassRef = classRef.push();
			console.log('after pushing data');
			console.log(addedClassRef.key());
			addedClassRef.set($scope.myclass, function(err){
				if(err){
					console.log('class not created');
				}
				else {
					console.log('class created successfully');
					$state.go('classProfile',{classId : addedClassRef.key()});
				}
			})
			//$state.go('#/classes/'+addedClassRef.name());

		};
})
   

//Class profile - shows details of the class


.controller('classProfileCtrl', function($scope,$state,$stateParams,$cordovaImagePicker,$firebaseArray) {
	console.log('param : '+ $stateParams.classId);
	var fb = new Firebase("https://classup.firebaseio.com/");
	$scope.myclass = {};
	$scope.images = [];
	var fbAuth = fb.getAuth();
	if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } else {
        $state.go("login");
    }

	var classRef = new Firebase("https://classup.firebaseio.com/classes/"+$stateParams.classId);
	classRef.once('value', function(snapshot){
		console.log(snapshot.val());
		$scope.myclass = snapshot.val();
 	})
	
	//var classRef = new Firebase('https://classup.firebaseio.com/classes/')
	$scope.addSubjectToClass = function() {

	};

	$scope.uploadProfilePic = function() {
        var options = {
        	maximumImagesCount: 1,
            quality : 80,
            Width: 500,
            Height: 500
        };
        console.log($cordovaImagePicker);
        $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, function(error) {
      // error getting photos
    });
    };
})
 