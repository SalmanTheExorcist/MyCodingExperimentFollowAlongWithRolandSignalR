(function () {
  'use strict'

  logToConsole("Inside site.js");

})();

/* ------------------------------------------------------- */
let myVideoElemntData = {
    isActive: false,
    trackInfo: {}
    };
const btnStarTheAction = async function () {
  logToConsole("Inside: btnStarTheAction()");
  
  
  try {
    //const mediaStream = 
    await navigator.mediaDevices.getUserMedia(
        { 
          video: true,
          audio: false 
        }      
      ).then(mediaStream => {
        const videoMyWebCam = document.getElementById('videoMyWebCam');   
        videoMyWebCam.srcObject = mediaStream;
        myVideoElemntData.isActive = true;
        myVideoElemntData.trackInfo = mediaStream.getVideoTracks()[0].getSettings();

       console.dir('myVideoElemntData:', JSON.stringify(myVideoElemntData.trackInfo,null,2));

      });
   

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

  let btnCaptureImageFromVideo = document.getElementById("btnCaptureImageFromVideo");
  let myCanvas = document.getElementById("myCanvas");
  let imgCapturedFromVideo = document.getElementById("imgCapturedFromVideo");

  //--------------------------------------
  btnCaptureImageFromVideo.addEventListener("click",function(){
    logToConsole("btnCaptureImageFromVideo Clicked");

    const contextFromCanvas = myCanvas.getContext('2d');
    myCanvas.width = videoMyWebCam.videoWidth;
    myCanvas.height = videoMyWebCam.videoHeight;
    contextFromCanvas.drawImage(videoMyWebCam, 0, 0, myCanvas.width, myCanvas.height);

    // Convert the canvas to a data URL (image)
    const strImageDataURL = myCanvas.toDataURL('image/png');
    imgCapturedFromVideo.src = strImageDataURL;

   // console.dir("strImageDataURL: ", JSON.stringify(strImageDataURL));

  });
  //--------------------------------------


  videoMyWebCam.addEventListener("ended",function(){
        videoMyWebCam.currentTime = 0;
        logToConsole("Video Ended.");
    });
  //--------------------------------------
  videoMyWebCam.addEventListener("timeupdate", function () {
     setVideoTimeDisplay(Math.floor(videoMyWebCam.currentTime));
    //console.log("VideoTimeUpdate.");
  });
  //--------------------------------------
  btnPlayVideo.addEventListener("click",function(){
        //videoMyWebCam.play();
        btnStarTheAction();
        setDisableCssForStopButton(false);
        logToConsole("Playing Video");
  });
  //--------------------------------------
  btnStopVideo.addEventListener("click",function(){
      videoMyWebCam.pause();
      videoMyWebCam.srcObject = null;
      //videoMyWebCam.currentTime = 0;
      setVideoTimeDisplay(0);
      setDisableCssForStopButton(true);

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
function setDisableCssForStopButton(boolValue)
{
  let btnStopVideo = document.getElementById("btnStopVideo");
  let btnPlayVideo = document.getElementById("btnPlayVideo");
  let btnCaptureImageFromVideo = document.getElementById("btnCaptureImageFromVideo");

  if(boolValue)
  {
    //Add "disable" css class to the <button/>
    btnStopVideo.className = "disabled btn btn-secondary";
    btnCaptureImageFromVideo.className = "disabled btn btn-info";
    btnPlayVideo.className = "btn btn-primary";
  }
  else
  {
    //Remove "disable" css class to the <button/>
    btnStopVideo.className = "btn btn-secondary";
    btnCaptureImageFromVideo.className = "btn btn-info";
    btnPlayVideo.className = "disabled btn btn-primary";
  };
}
