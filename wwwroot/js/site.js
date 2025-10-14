(function () {
    'use strict'


    const timestamp = Date.now();

    // Convert timestamp to a readable date and time format
    const currentDate = new Date(timestamp);

    // Formatting date 
    const formattedDate = currentDate.toLocaleString();


    console.log(`Inside site.js: ${formattedDate}`);



})();

async function btnStarTheAction() {
    console.log("Inside: btnStarTheAction()");

    try 
    {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoMyWebCam = document.getElementById('videoMyWebCam');
      videoMyWebCam.srcObject = mediaStream;
    } catch (error) {
      console.error('Error accessing webcam: ', error);
    }
};       