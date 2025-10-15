(function () {
  'use strict'

  logToConsole("Inside site.js");

})();

/* ------------------------------------------------------- */
const btnStarTheAction = async function () {
  logToConsole("Inside: btnStarTheAction()");

  
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
        { 
          video: true,
          audio: false 
        }
      
      );
    const videoMyWebCam = document.getElementById('videoMyWebCam');
    videoMyWebCam.srcObject = mediaStream;
  } catch (error) {
    console.error('Error accessing webcam: ', error);
  }
};
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

const myInitializeIndexPageStuff = function () {
  logToConsole("Inside: myInitializeIndexPageStuff()");

  let videoMyWebCam = document.getElementById('videoMyWebCam');
  let txtVideoTimeDisplay = document.getElementById("txtVideoTimeDisplay");
  let btnPlayVideo = document.getElementById("btnPlayVideo");
  let btnStopVideo = document.getElementById("btnStopVideo");

  videoMyWebCam.addEventListener("ended",function(){
        videoMyWebCam.currentTime = 0;
        logToConsole("Video Ended.");
    });

  videoMyWebCam.addEventListener("timeupdate", function () {
     setVideoTimeDisplay(Math.floor(videoMyWebCam.currentTime));
    //console.log("VideoTimeUpdate.");
  });

  btnPlayVideo.addEventListener("click",function(){
        //videoMyWebCam.play();
        btnStarTheAction();
        logToConsole("Playing Video");
  });

  btnStopVideo.addEventListener("click",function(){
      videoMyWebCam.pause();
      videoMyWebCam.srcObject = null;
      //videoMyWebCam.currentTime = 0;
      setVideoTimeDisplay(0);

      logToConsole("Stopped Video");
    });

}
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
function setVideoTimeDisplay(strValue){
  txtVideoTimeDisplay.innerText = strValue;
}
/* ------------------------------------------------------- */

