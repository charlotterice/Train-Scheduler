// Initialize Firebase
var config = {
  apiKey: "AIzaSyDQxeVHNQp-J7P1FMYCSGNWptCFXtywrO8",
  authDomain: "train-scheduler-c0491.firebaseapp.com",
  databaseURL: "https://train-scheduler-c0491.firebaseio.com",
  projectId: "train-scheduler-c0491",
  storageBucket: "train-scheduler-c0491.appspot.com",
  messagingSenderId: "118643613918"
};
firebase.initializeApp(config);

var database = firebase.database();

//button to add new train
$("#add-train-button").on("click", function(event) {
  event.preventDefault();
  //grab value from input boxes
  var trainName = $("#train-name")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrain = $("#first-train-time")
    .val()
    .trim();
  var frequency = $("#frequency")
    .val()
    .trim();
  //local "temp" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    first: firstTrain,
    frequency: frequency
  };
  //sends train data to firebase
  database.ref().push(newTrain);

  //console log progess
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  // clear text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});

//pulls information from firebase
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;
  var currentTime = moment();
  var timeArr = firstTrain.split(":");
        var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
 //check train values
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  console.log(currentTime.format('MMMM Do YYYY, h:mm:ss a'));
  var firstTimeConverted = moment(trainTime);
  console.log(firstTimeConverted);
  var timeDifference = moment().diff(moment(firstTimeConverted),"minutes");
  console.log("Time difference"+timeDifference);
});
