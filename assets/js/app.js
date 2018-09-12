
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

// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    


    // Get inputs
    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-dest").val().trim();
    // var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#freq").val().trim();
    var nextArrival = "";
    var minAway = "";

    console.log("revised FirstTrain: " + firstTrain);

    if (trainName == 0 || trainDest == 0 || firstTrain == 0 || firstTrain == NaN|| frequency == 0) {

        $('#modalFail').modal({
            show: true
        });

        return;

    } else {

        $('#modalSuccess').modal({
            show: true
        })
    }
    

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

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#first-train").val("");
    $("#freq").val("");
    
    console.log("firstTrain after clears text boxes: " + firstTrain);

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

    console.log("firstTrain after childSnapshot: " + firstTrain);

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

    // pushing time back 1 year to make sure it comes before current time...???
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("firsTrainConverted: " + firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("current time: " + currentTime);

    // difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("diffTime?!: " + diffTime);

    // the time apart or remainder using modulus
    var trainRemainder = diffTime % frequency;
    console.log("trainRemainder: " + trainRemainder);

    // minutes until next train
    var minNextTrain = frequency - trainRemainder;
    console.log("minNextTrain: " + minNextTrain);

    // the next train
    var nextTrain = moment().add(minNextTrain, "minutes");
    console.log("nextTrain (arrival time): " + nextTrain);
        console.log("nextTrain formatted (arrival time): " + moment(nextTrain).format("HH:mm"));

    // *****************************
    // Create the new row
    var newRow = $("<tr>").append(

        $("<td scope='row'>").text(trainName),

        $("<td>").text(trainDest),

        $("<td>").text(frequency),

        $("<td>").text(nextTrain.format("HH:mm")),

        $("<td>").text(minNextTrain)
    );

    // Append the new row to the table
    $("#train-schedule > tbody").prepend(newRow);

    // colorIZE my tables
     if(minNextTrain <= 10) {
         $(newRow).addClass("table-warning");
     } else if(minNextTrain >= 6) {
         $(newRow).removeClass("table-warning");
     }
    if (minNextTrain <= 5) {
        $(newRow).addClass("table-danger");
    } else if (minNextTrain > 5) {
        $(newRow).removeClass("table-danger");
    }

}, function (errorObject) {

    console.log("The read failed: " + errorObject.code);

});

/**************************/

// current time for display
$("#time-now").append(moment().format("HH:mm"));
$("#time-now").addClass("time-style");

var timeNow = setInterval(clockElement, 1000);

function clockElement(){
     var t = moment().format("HH:mm");
    $("#time-now").html(t);
}

/**************************/

/**************************/

$(window).resize(function () {
   
    if ($(window).width() <= 768) 
    
        $("#train-schedule").addClass("table-sm");

    else $("#train-schedule").removeClass("table-sm");

});

window.onload = function() {

    if ($(window).width() < 768) {

        $("#train-schedule").addClass("table-sm");
    } else {
        
        $("#train-schedule").removeClass("table-sm");
    }

}


console.log("*****MOMENT TESTING*****" + moment(1536764184238).format("HH:mm"));
