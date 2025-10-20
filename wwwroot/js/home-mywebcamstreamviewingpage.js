
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


        mySignalRConnection.on("ReceiveNewVideoFrame",
        (strBase64VideoFrameImage) => {

           let imageForDisplayingVideoFrame = document.getElementById("imageForDisplayingVideoFrame");
           
            imageForDisplayingVideoFrame.src = strBase64VideoFrameImage;

        });


    mySignalRConnection.start().catch((err) => {
        return console.error(err.toString());
    });

    return mySignalRConnection;

};


const myInitializeMyWebCamStreamViewingPagePageStuff = function(){

    logToConsole("Inside myInitializeMyWebCamStreamViewingPagePageStuff()");

    myConnection = myInitializeSignalRConnection();

}