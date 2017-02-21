angular.module('runningBud', [])
//show 1 landing page
//show 2 form
//show 3 log in
.controller('runningBudController', function($scope) {
  console.log("controller loaded");
  $scope.show = 1;
  $scope.user = undefined;

    $scope.loadForm = function(type){
    $scope.user = type;
    $scope.show = 2;
    //console.log("loadForm called, user is ", $scope.user);
  }

  $scope.submit = function(){
    // console.log("submit clicked")
    var grabInput = function(x){
      return document.getElementById(x).value;
    }
    $scope.firstName = grabInput("firstName");
    $scope.lastName = grabInput("lastName");
    $scope.phone = grabInput("phone");
    $scope.email = grabInput("email");
    $scope.hoods = $("#hoods input:checkbox:checked").map(function(){
      return $(this).val()}).get();
    // console.log("firstName: ", $scope.firstName);
    // console.log("lastName ", $scope.lastName)
    // console.log("phone ", $scope.phone);
    // console.log("email ", $scope.email)
    // console.log("neighbhorhoods ", $scope.hoods)
    $scope.checkForm();
  }

  $scope.validatePhone = function(str){
    var arr = str.split("");
    for (var i = 0; i < arr.length; i++){
      if (arr[i] === "-" || arr[i] === ")" || arr[i] === "(") {
        arr.splice(i, 1);
        i--;
      }
    }
    if (arr.length > 10 && arr[0] === "1"){
      arr.splice(0,1);
    }
    if (arr.length === 10 && isNaN(arr.join("")) === false){
      console.log("phone number is ", arr.join(""));
      return true;
    }
    return false;
  }

  $scope.validateEmail = function(str){
    if (str === undefined || str === ""){
      return false;
    }
    var arr = str.split("@");
    if (arr.length === 1){
      return false;
    }
    var name = arr[0];
    var arr2 = arr[1].split(".");
    var provider = arr2[0];
    var dotWhat = arr2[1];
    if (!$scope.isEmailFriendly(name) || !$scope.isEmailFriendly(provider) || !$scope.isEmailFriendly(dotWhat)){
      return false;
    }
    return true;
  }

  $scope.isEmailFriendly = function(str){
    if (str === undefined || str.length === 0){
      return false;
    }
    for (var i = 0; i < str.length; i++){
      var cc = str.charCodeAt(i);
      if (!parseInt(str[i]) && (cc < 65 || cc > 122)){
        return false;
      }
    }
    return true;
  }

  $scope.checkForm = function(){
      if ($scope.firstName === ""){
        $scope.badFormItem("firstName");
      } if ($scope.lastName === ""){
        $scope.badFormItem("lastName");
      } if (!$scope.validatePhone($scope.phone)){
        $scope.badFormItem("phone");
      } if (!$scope.validateEmail($scope.email)){
        $scope.badFormItem("email");
      } if ($scope.hoods.length === 0){
        $scope.badFormItem("hoods");
      } else {
        //SEND INFO TO BACK END
        console.log("form inputs are good")
      }
  }

  $scope.badFormItem = function(x){
    document.getElementById(x).style.border = ".2em solid red";
    document.getElementById("fix").style.visibility = "visible";
  }

  $scope.signIn = function(){
    $scope.show = 3;
  }
  $scope.login = function(){
    console.log("logging in...")
  }
});
