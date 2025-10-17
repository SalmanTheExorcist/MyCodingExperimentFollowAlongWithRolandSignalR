(function () {
  'use strict'

  logToConsole("Inside site.js");

})();

/* ------------------------------------------------------- */


//--A function/method to initialize our SIgnalR Connection
//---The SignalR connection is always initiated by the client.
let myConnection = {};

const myInitializeSignalRConnection = function () {
  logToConsole("Inside: myInitializeSignalRConnection()");

  const mySignalRConnection = new signalR.HubConnectionBuilder()
    .withUrl("/mysuperfancyhub")
    .build();
  mySignalRConnection.start()
    .catch(someError => console.log(someError.toString()));

  //return mySignalRConnection;                     
  myConnection = mySignalRConnection;

};
/* ------------------------------------------------------- */


  function logToConsole(strLogMessage){

     const timestamp = Date.now();

    // Convert timestamp to a readable date and time format
    const currentDate = new Date(timestamp);

    // Formatting date 
    const formattedDate = currentDate.toLocaleString();

     console.log(`${formattedDate}: ${strLogMessage}`);

     
  }
/* ------------------------------------------------------- */



