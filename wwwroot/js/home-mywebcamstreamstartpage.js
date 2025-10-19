let myVideoElemntData = {
    isActive: false,
    trackInfo: {}
    };
const btnStarPlayingWebCamVideo = async function () {
  logToConsole("Inside: btnStarPlayingWebCamVideo()");  
  
  try {
   
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

       logToConsole(`myVideoElemntData: ${JSON.stringify(myVideoElemntData.trackInfo,null,2)}`);

      });
   

  } catch (error) {
    console.error('Error accessing webcam: ', error);
  }
};
/* ------------------------------------------------------- */

const myInitializeMyWebCamStreamStartPageStuff = function(){
    logToConsole("Inside myInitializeMyWebCamStreamStartPageStuff()");

    let videoMyWebCam = document.getElementById('videoMyWebCam');
  let txtVideoTimeDisplay = document.getElementById("txtVideoTimeDisplay");
  let btnPlayVideo = document.getElementById("btnPlayVideo");
  let btnStopVideo = document.getElementById("btnStopVideo");

  let btnStartStreamFromVideo = document.getElementById("btnStartStreamFromVideo");
  let myCanvas = document.getElementById("myCanvas");
 
   //--------------------------------------
   videoMyWebCam.addEventListener("ended",function(){
        videoMyWebCam.currentTime = 0;
        logToConsole("Video Ended.");
    });

  //--------------------------------------
  videoMyWebCam.addEventListener("timeupdate", function () {
     setVideoTimeDisplay(Math.floor(videoMyWebCam.currentTime));
  
  });
  //--------------------------------------
  btnPlayVideo.addEventListener("click",function(){
      
        btnStarPlayingWebCamVideo();
        setDisableCssForStopButton(false);
        logToConsole("Playing Video");
  });
  //--------------------------------------
  btnStopVideo.addEventListener("click",function(){
      videoMyWebCam.pause();
      videoMyWebCam.srcObject = null;
      
      setVideoTimeDisplay(0);
      setDisableCssForStopButton(true);

      logToConsole("Stopped Video");
    });
    //--------------------------------------

    
};//End-Of-myInitializeMyWebCamStreamStartPageStuff()
/* ------------------------------------------------------- */








/* ------------------------------------------------------- */

function setVideoTimeDisplay(strValue){
  txtVideoTimeDisplay.innerText = strValue;
}
/* ------------------------------------------------------- */
function setDisableCssForStopButton(boolValue)
{
  let btnStopVideo = document.getElementById("btnStopVideo");
  let btnPlayVideo = document.getElementById("btnPlayVideo");
  let btnStartStreamFromVideo = document.getElementById("btnStartStreamFromVideo");

  if(boolValue)
  {
    //Add "disable" css class to the <button/>
    btnStopVideo.className = "disabled btn btn-secondary";
    btnStartStreamFromVideo.className = "disabled btn btn-info";
    btnPlayVideo.className = "btn btn-primary";
  }
  else
  {
    //Remove "disable" css class to the <button/>
    btnStopVideo.className = "btn btn-secondary";
    btnStartStreamFromVideo.className = "btn btn-info";
    btnPlayVideo.className = "disabled btn btn-primary";
  };
}
/* ------------------------------------------------------- */