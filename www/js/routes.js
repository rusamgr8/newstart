angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    .state('logout', {
      url: '/logout',
      templateUrl: 'templates/login.html',
      controller: 'logoutCtrl'
    })
      
        
    .state('signup', {
      url: '/signUp',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.classUp', {
      url: '/classList',
      views: {
        'side-menu21': {
          templateUrl: 'templates/classUp.html',
          controller: 'classUpCtrl'
        }
      }
    })
        
      
    
      
        
    .state('createClass', {
      url: '/createClass',
      templateUrl: 'templates/myClass.html',
      controller: 'createClassCtrl'
    })
        
      
    
      
        
    .state('classProfile', {

      url: '/classes/:classId',
      templateUrl: 'templates/classProfile.html',
      controller: 'classProfileCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});