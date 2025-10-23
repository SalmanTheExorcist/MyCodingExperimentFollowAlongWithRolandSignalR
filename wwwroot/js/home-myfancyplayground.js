
const myInitializeMyFancyPlaygroundPageStuff = function () {
    logToConsole("Inside: myInitializeMyFancyPlaygroundPageStuff()");
}


//--A function/method to initialize our SIgnalR Connection
//---The SignalR connection is always initiated by the client.

const myInitializeSignalRConnection = () => {
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

    mySignalRConnection.on("ReceiveNewMyPhotoFancy",
        ({ myPhotoFancyNotifyId, fancyBase64URL, fancyDescription }) => {

           
            let tr = document.getElementById(myPhotoFancyNotifyId + "-tr");
            let txtDescriptionSpan = document.getElementById(myPhotoFancyNotifyId + "-descriptionSpan");
            let imageFromInputFile = document.getElementById(myPhotoFancyNotifyId + "-image");
            let imageOriginal = document.getElementById(myPhotoFancyNotifyId + "-imageOriginal");


            //start animation
            tr.classList.add("animate-highlight");
            setTimeout(() => tr.classList.remove("animate-highlight"), 3000);

            txtDescriptionSpan.innerText = fancyDescription;
            imageFromInputFile.src = fancyBase64URL;
            imageOriginal.src = fancyBase64URL;

        });

    mySignalRConnection.start().catch((err) => {
        return console.error(err.toString());
    });

    return mySignalRConnection;

};
const myConnection = myInitializeSignalRConnection();
//------------------------------------------------------------------

const btnAddNewFancyPhoto_click = async function(){
    logToConsole("btnAddNewFancyPhoto_click()");

    let txtAddItemResultsSpan = document.getElementById("addItem-resultsSpan");
    let txtAddItemTitle = document.getElementById("addItem-title");
    let addItemFileinputElement = document.getElementById("addItem-fileinput");
    let btnSubmitNew = document.getElementById("addItem-btnSubmitNew");
    let imageAddItem = document.getElementById("addItem-image");
    let txtSubmitNewResultsSpan = document.getElementById("btnSubmitNew-resultsSpan");

    if(txtAddItemTitle.value === ""){
        txtSubmitNewResultsSpan.innerText = "Missing Item Title.";
    }
    else{
        //--Continue Add New
        txtSubmitNewResultsSpan.innerText = "";
    };






    
}//--End-btnAddNewFancyPhoto_click()

const addItemImageSelectionChanged = function(){

    logToConsole("addItemImageSelectionChanged()");

     const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    let imageFromInputFile = document.getElementById("addItem-image");
    let txtResultsSpan = document.getElementById("addItem-resultsSpan");
    let fileInputElement = document.getElementById("addItem-fileinput");
    let btnSubmitFancyPhoto = document.getElementById("addItem-btnSubmitNew");
    var strImageBase64 = "";
    var boolFileIsGoodToGo = true;
    var txtOutputMessage = "";

     var singleFile = fileInputElement.files[0];
    var singleFileName = singleFile.name.toLowerCase();
    var singleFileExtension = singleFileName
        .substring(singleFileName.lastIndexOf('.') + 1);



    if (allowedExtensions.includes(singleFileExtension)) {
        txtOutputMessage += "File extention is Good<br/>";
        if (singleFile.size > 10000000) {
            txtOutputMessage += "File Size Exceeds 10MB<br/>";
            boolFileIsGoodToGo = false;
        }
    }
    else {
        txtOutputMessage += `File extension ${singleFileExtension} Not Allowed!`;
        boolFileIsGoodToGo = false;
    };

    txtResultsSpan.innerHTML = txtOutputMessage;
    //-------------------------------------

    imageFromInputFile.src = "";
    strImageBase64 = "";

    if (boolFileIsGoodToGo) {
        //Do more stuff with the selected File/Picture
        var myFileReader = new FileReader();


        myFileReader.onload = function (e) {
            strImageBase64 = e.target.result;
            imageFromInputFile.src = strImageBase64;
        };
        myFileReader.readAsDataURL(singleFile);

        //--We can now enable the submit button
        btnSubmitFancyPhoto.className = "btn btn-primary";

    }
    else {
        //--disable the submit button
        btnSubmitFancyPhoto.className = "btn btn-primary disabled";
    };



}//--End-addItemImageSelectionChanged()



//-----------------------------------------------------------------

const submitFancyPhoto = async function (singleMyPhotoFancyId) {
    logToConsole(`submitFancyPhoto(): ${singleMyPhotoFancyId}`);

    let txtResultsSpan = document.getElementById(singleMyPhotoFancyId + "-resultsSpan");
    let fileInputElement = document.getElementById(singleMyPhotoFancyId + "-input");
    let btnSubmitFancyPhoto = document.getElementById(singleMyPhotoFancyId + "-btnSubmitFancyPhoto");

    let imageFromInputFile = document.getElementById(singleMyPhotoFancyId + "-image");

    var myUpdatedPhotoFancy = {
        id: singleMyPhotoFancyId,
        fancyBase64URL: "",
        fancyDescription: ""

    };

    myUpdatedPhotoFancy.fancyDescription = "Submitted On: " + getCurrentDateFormated();
    myUpdatedPhotoFancy.fancyBase64URL = imageFromInputFile.src;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(myUpdatedPhotoFancy);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("/myphotofancy", requestOptions);
    // .then((response) => response.text())
    // .then((result) => {

    txtResultsSpan.innerHTML = "";
    fileInputElement.value = "";
    btnSubmitFancyPhoto.className = "btn btn-primary disabled";

    try {
       
        await myConnection.invoke("NotifyNewMyPhotoFancy",
            {
                myPhotoFancyNotifyId: parseInt(myUpdatedPhotoFancy.id),
                fancyBase64URL: myUpdatedPhotoFancy.fancyBase64URL,
                fancyDescription: myUpdatedPhotoFancy.fancyDescription
            }
        );

    } catch (err) {
        console.error(err);
    };

    // })
    // .catch((error) => logToConsole(error))



};
//-----------------------------------------------------------------

const imageSelectionChanged = function (singleMyPhotoFancyId) {
    logToConsole(`imageSelectionChanged(): ${singleMyPhotoFancyId}`);

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    let imageFromInputFile = document.getElementById(singleMyPhotoFancyId + "-image");
    let txtResultsSpan = document.getElementById(singleMyPhotoFancyId + "-resultsSpan");
    let fileInputElement = document.getElementById(singleMyPhotoFancyId + "-input");
    let btnSubmitFancyPhoto = document.getElementById(singleMyPhotoFancyId + "-btnSubmitFancyPhoto");
    var strImageBase64 = "";
    var boolFileIsGoodToGo = true;
    var txtOutputMessage = "";

    var singleFile = fileInputElement.files[0];
    var singleFileName = singleFile.name.toLowerCase();
    var singleFileExtension = singleFileName
        .substring(singleFileName.lastIndexOf('.') + 1);



    if (allowedExtensions.includes(singleFileExtension)) {
        txtOutputMessage += "File extention is Good<br/>";
        if (singleFile.size > 10000000) {
            txtOutputMessage += "File Size Exceeds 10MB<br/>";
            boolFileIsGoodToGo = false;
        }
    }
    else {
        txtOutputMessage += `File extension ${singleFileExtension} Not Allowed!`;
        boolFileIsGoodToGo = false;
    };

    txtResultsSpan.innerHTML = txtOutputMessage;
    //-------------------------------------

    imageFromInputFile.src = "";
    strImageBase64 = "";

    if (boolFileIsGoodToGo) {
        //Do more stuff with the selected File/Picture
        var myFileReader = new FileReader();


        myFileReader.onload = function (e) {
            strImageBase64 = e.target.result;
            imageFromInputFile.src = strImageBase64;
        };
        myFileReader.readAsDataURL(singleFile);

        //--We can now enable the submit button
        btnSubmitFancyPhoto.className = "btn btn-primary";

    }
    else {
        //--disable the submit button
        btnSubmitFancyPhoto.className = "btn btn-primary disabled";
    };


}
//--------------------------------------------------------