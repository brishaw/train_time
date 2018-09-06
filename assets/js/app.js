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

// var trainName = "";
// var trainDest = "";
// var firstTrain = "";
// var frequency = "";
// var minAway = "";

// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-dest").val().trim();
    //var firstTrain = $("#first-train").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
    var frequency = $("#freq").val().trim();
    var nextArrival = "";
    var minAway = "";

    
    // Change what is saved in firebase
    var newTrain = {
        trainName: trainName,
        trainDest: trainDest,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway
    };

    database.ref().push(newTrain);



    // Create a new post reference with an auto-generated id
    // var newPostRef = database.ref().push();
    // newPostRef.set({
    //     testTest: testTest
    // });

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#first-train").val("");
    $("#freq").val("");

}); // end click-button function

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref().on("child_added", function (childSnapshot) {

    // Print the initial data to the console.
    console.log("childSnapshot value: " + childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().trainDest;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;
    var minAway = childSnapshot.val().minAway;



    // Log the value of the various properties
    console.log("childSnapshot trainName: " + childSnapshot.val().trainName);
    console.log("childSnapshot trainDest: " + childSnapshot.val().trainDest);
    console.log("childSnapshot firstTrain: " + childSnapshot.val().firstTrain);
    console.log("childSnapshot frequency: " + childSnapshot.val().frequency);
    console.log("childSnapshot nextArrival: " + childSnapshot.val().nextArrival);
    console.log("childSnapshot minAway: " + childSnapshot.val().minAway);

// make the firstTrain look nicer

var niceFirstTrain = moment.unix(firstTrain).format("HH:mm");
console.log("niceFirstTrain: " + niceFirstTrain);

var currentTime = moment().format("X");
console.log("current time: " + currentTime);



    // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // *****************************
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        //$("<td>").text(firstTrain),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)
    );

    // Append the new row to the table
    $("#train-schedule > tbody").prepend(newRow);


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