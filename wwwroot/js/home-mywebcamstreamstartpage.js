
//--A function/method to initialize our SIgnalR Connection
//---The SignalR connection is always initiated by the client.
let myConnection = {};
const myInitializeSignalRConnection = function () {
    logToConsole("Inside: myInitializeSignalRConnection()");

    const mySignalRConnection = new signalR.HubConnectionBuilder()
        .withUrl("/mysuperfancyhub",
            {
                transport: signalR.HttpTransportType.WebSockets,
                skipNegotiation: true
            }
        )
        .configureLogging(signalR.LogLevel.Information)
        .build();


    mySignalRConnection.start().catch((err) => {
        return console.error(err.toString());
    });

    return mySignalRConnection;

};



//-----------------------------------------------------------------
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

            logToConsole(`myVideoElemntData: ${JSON.stringify(myVideoElemntData.trackInfo, null, 2)}`);

        });


    } catch (error) {
        console.error('Error accessing webcam: ', error);
    }
};
/* ------------------------------------------------------- */
let boolCaptureAndSendFlag = false; // This flag controls whether the function should continue running
let intervalForCaptureAndSend = null; 

const btnStartStreamFromVideo_click = async function (event) {
    logToConsole("Inside btnStartStreamFromVideo_click()");
   
    boolCaptureAndSendFlag = true;   
    intervalForCaptureAndSend = setInterval(ControlCaptureAndSendInterval,100);


};

async function ControlCaptureAndSendInterval(){
    if(boolCaptureAndSendFlag){
          await CaptureAndSend();
    }
    else{
        clearInterval(intervalForCaptureAndSend); 
    }
}

async function CaptureAndSend(){
     let myCanvas = document.getElementById("myCanvas");
    let videoMyWebCam = document.getElementById('videoMyWebCam');

    //------------------------------------
     const contextFromCanvas = myCanvas.getContext('2d');
    myCanvas.width = videoMyWebCam.videoWidth;
    myCanvas.height = videoMyWebCam.videoHeight;
    contextFromCanvas.drawImage(videoMyWebCam, 0, 0, myCanvas.width, myCanvas.height);

    // Convert the canvas to a data URL (image)
    const strImageDataURL = myCanvas.toDataURL('image/png');

    //------------------------------------

     try {
       
        await myConnection.invoke("NotifyNewVideoFrame", strImageDataURL);
        

    } catch (err) {
        console.error(err);
    };

};



/* -------------------------------------------------------- */
const myInitializeMyWebCamStreamStartPageStuff = function () {
    logToConsole("Inside myInitializeMyWebCamStreamStartPageStuff()");

    myConnection = myInitializeSignalRConnection();

    let videoMyWebCam = document.getElementById('videoMyWebCam');
    let btnPlayVideo = document.getElementById("btnPlayVideo");
    let btnStopVideo = document.getElementById("btnStopVideo");
    let btnStartStreamFromVideo = document.getElementById("btnStartStreamFromVideo");

    //---------------------------------------

    btnStartStreamFromVideo.addEventListener("click", btnStartStreamFromVideo_click);



    //--------------------------------------
    videoMyWebCam.addEventListener("ended", function () {
        videoMyWebCam.currentTime = 0;
        logToConsole("Video Ended.");
    });

    //--------------------------------------
    videoMyWebCam.addEventListener("timeupdate", function () {
        setVideoTimeDisplay(Math.floor(videoMyWebCam.currentTime));

    });
    //--------------------------------------
    btnPlayVideo.addEventListener("click", function () {

        btnStarPlayingWebCamVideo();
        setDisableCssForStopButton(false);
        logToConsole("Playing Video");
    });
    //--------------------------------------
    btnStopVideo.addEventListener("click", function () {
        
        boolCaptureAndSendFlag = false;

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

function setVideoTimeDisplay(strValue) {
    txtVideoTimeDisplay.innerText = strValue;
}
/* ------------------------------------------------------- */
function setDisableCssForStopButton(boolValue) {
    let btnStopVideo = document.getElementById("btnStopVideo");
    let btnPlayVideo = document.getElementById("btnPlayVideo");
    let btnStartStreamFromVideo = document.getElementById("btnStartStreamFromVideo");

    if (boolValue) {
        //Add "disable" css class to the <button/>
        btnStopVideo.className = "disabled btn btn-secondary";
        btnStartStreamFromVideo.className = "disabled btn btn-info";
        btnPlayVideo.className = "btn btn-primary";
    }
    else {
        //Remove "disable" css class to the <button/>
        btnStopVideo.className = "btn btn-secondary";
        btnStartStreamFromVideo.className = "btn btn-info";
        btnPlayVideo.className = "disabled btn btn-primary";
    };
}
/* ------------------------------------------------------- */