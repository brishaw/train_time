// Initialize Firebase
var config = {
    apiKey: "AIzaSyAuXTMvgIZ3Uj7aI9m_-WM8fpIYN1Ph4LI",
    authDomain: "train-time-v1.firebaseapp.com",
    databaseURL: "https://train-time-v1.firebaseio.com",
    projectId: "train-time-v1",
    storageBucket: "train-time-v1.appspot.com",
    messagingSenderId: "1007496006681"
};

firebase.initializeApp(config);

// Variables
// ================================================================================

// Get a reference to the database service
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var trainName = "";
var trainDest = "";
var firstTrain = "";
var frequency = "";

// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    trainName = $("#train-name").val().trim();
    destName = $("#train-dest").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#freq").val().trim();

    // Change what is saved in firebase
    database.ref().set({
        trainName: trainName,
        destName: destName,
        firstTrain: firstTrain,
        frequency: frequency
    });
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function (snapshot) {

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destName);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    // Change the HTML
    $("#train-data").text(snapshot.val().trainName + " | " + snapshot.val().destName + " | " + snapshot.val().firstTrain + " | " + snapshot.val().frequency);

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});