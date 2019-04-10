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
  var frequency = $("#frequency")
    .val()
    .trim();
  var firstTrain = $("#first-train-time")
    .val()
    .trim();
  //local "temp" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    first: firstTrain
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
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var firstTimeConverted = moment(trainTime, "HH:mm")
  var timeDifference = moment().diff(moment(trainTime), "minutes");
  var remainder = timeDifference % frequency;
  var minutesTilNext = frequency - remainder;
  var nextTrainTime = moment().add(minutesTilNext,"minutes");
  //check train values
  console.log("Train Name: " + trainName);
  console.log("Train Destination: " + destination);
  console.log("First Train Time: " + firstTrain);
  console.log("Frequency:" + frequency);
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));
  console.log("Current Time Formatted: " + currentTime.format("LT"));
  console.log(firstTimeConverted);
  console.log("Time Difference: " + timeDifference);
  console.log("Minutes til next train" + minutesTilNext);
  console.log("Arrival Time: " + moment(nextTrainTime).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<td>").html(trainName),
    $("<td>").html(destination),
    $("<td>").html(frequency),
    $("<td>").html(nextTrainTime),
    $("<td>").html(minutesTilNext)
  );
  $("#train-table > tbody").append(newRow);
});
