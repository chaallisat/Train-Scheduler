// TODO: Add SDKs for Firebase products that you want to use
//     https://firebase.google.com/docs/web/setup#config-web-app


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCKC2JH5V3tiOkjuXsJLPEnO-BNaUKYJfI",
    authDomain: "homework-7-train-71f26.firebaseapp.com",
    databaseURL: "https://homework-7-train-71f26.firebaseio.com",
    projectId: "homework-7-train-71f26",
    storageBucket: "",
    messagingSenderId: "795674173285",
    appId: "1:795674173285:web:d23258c9ef568a56"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()

  // Initial Variables
  let tName = "Hogwarts Express";
  let tDestination = "Hogwarts";
  let tFrequency = 3;
  let firstTime = "03:30";

  
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    // Get the input values
    const trainName = $("#train-name").val().trim();
    const trainDestination = $("#destination").val().trim();
    const firstTrainTime = parseInt($("#first-train").val().trim());
    const trainFrequency = $("#frequency").val().trim();

    const newTrain = {
      name: trainName,
      destination: trainDestination,
      trainTime: firstTrainTime,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);




    alert("New Train Added");
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
    

  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    const trainName = childSnapshot.val().name;
    const trainDestination = childSnapshot.val().destination;
    const firstTrainTime = childSnapshot.val().trainTime;
    const trainFrequency = childSnapshot.val().frequency;

    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(firstTrainTime),
      $("<td>").text(trainFrequency),
    );

    $("#train-table > tbody").append(newRow);

  });
    
  //Show on page
  
  //    * Train Name
  
  //    * Destination 
  
  //    * First Train Time -- in military time
  
  //    * Frequency -- in minutes
  
  //  * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  
  //  * Users from many different machines must be able to view same train times.
  
  
  // First Time (pushed back 1 year to make sure it comes before current time)
  let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    let tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    let tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    

