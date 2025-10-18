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
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/* ------------------------------------------------------- */


  function logToConsole(strLogMessage){

     const timestamp = Date.now();

    // Convert timestamp to a readable date and time format
    const currentDate = new Date(timestamp);

    // Formatting date 
    const formattedDate = formatDate(currentDate);
  
     console.log(`${formattedDate}: ${strLogMessage}`);

     
  }
/* ------------------------------------------------------- */



