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

//*****************************************//
console.log("On your marks...get set...GO!");
//*****************************************//


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
var minAway = "";

var testTest = "";
// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    trainName = $("#train-name").val().trim();
    trainDest = $("#train-dest").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#freq").val().trim();
    minAway = "nothing";

    testTest = frequency;
    // Change what is saved in firebase
    database.ref().set({
        trainName: trainName,
        trainDest: trainDest,
        firstTrain: firstTrain,
        frequency: frequency,
        minAway: minAway
    });

    // Create a new post reference with an auto-generated id
    var newPostRef = database.ref().push();
    newPostRef.set({
        testTest: testTest
    });
});

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("value", function (snapshot) {

    // Print the initial data to the console.
    console.log("snapshot value: " + snapshot.val());

    // Log the value of the various properties
    console.log("snapshot trainName: " + snapshot.val().trainName);
    console.log("snapshot trainDest: " + snapshot.val().trainDest);
    console.log("snapshot firstTrain: " + snapshot.val().firstTrain);
    console.log("snapshot frequency: " + snapshot.val().frequency);
    console.log("snapshot minAway: " + snapshot.val().minAway);

// *****************************
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency),
        $("<td>").text(minAway)
    );

    // Append the new row to the table
    $("#train-schedule > tbody").append(newRow);


// *****************************




    // Change the HTML
    // $("#train-data").text(snapshot.val().trainName + " | " + snapshot.val().destName + " | " + snapshot.val().firstTrain + " | " + snapshot.val().frequency);

    

// *****************************

// trying to populate the table...

    // var items = snapshot.val();

    // var rows = "";
    
    //     $.each(items, function(){
    //         rows += "<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destName + "</td><td>" + snapshot.val().firstTrain + "</td><td>" + snapshot.val().frequency + "</td></tr>" 
    //     });
    

    //     $(rows).prependTo("#train-schedule tbody");

   // *****************************
    
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

var x = moment();
console.log("moment(): " + x);
console.log("moment().format(HH.mm): " + x.format("HH:mm"));