
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
        .withHubProtocol(
            new signalR.protocols.msgpack.MessagePackHubProtocol()
        )
        .build();

        mySignalRConnection.on("ReceiveMyPhotoFancyAfterCreate",
                ({ Id, FancyBase64URL, FancyTitle, FancyDescription}) => { 
                   logToConsole(`Newly Added MyPhotoFancy Id: ${Id}`);

                  var tbody = document.querySelector("#myTable>tbody");
                tbody.innerHTML += `<tr id="${Id}-tr" class="align-middle">
                                    <td>${FancyTitle}</td >
                                    <td class="fw-bolder">
                                       <span id="${Id}-descriptionSpan">
                                            ${FancyDescription}
                                        </span>
                                    </td >
                                    <td>
                                       <img src="${FancyBase64URL}"
                                        alt="${FancyTitle} - ${FancyDescription}"
                                        class="rounded mx-auto d-block MyPhotoFancyImage" id="${Id}-imageOriginal">                      
                                    </td>
                                    <td>
                                         <input type="file" id="${Id}-input"
                                            onchange="imageSelectionChanged(${Id})"
                                            accept="image/png, image/jpeg, image/jpg ,image/gif" />


                                        <img id="${Id}-image" src="${FancyBase64URL}"
                                            alt="${FancyTitle} - New Photo"
                                            class="rounded mx-auto d-block MyPhotoFancyImage border border-3 border-primary">

                                        <button class="btn btn-primary disabled" type="button"
                                            id="${Id}-btnSubmitFancyPhoto"
                                            onclick="submitFancyPhoto(${Id})">
                                            Submit New FancyPhoto
                                        </button>
                                        <div class="d-flex flex-column">
                                            <span id="${Id}-resultsSpan" class="fw-bolder"></span>
                                        </div>
                                    </td>
                                    </tr>`;


        
        });




    mySignalRConnection.on("ReceiveNewMyPhotoFancy",
        ({ MyPhotoFancyNotifyId, FancyBase64URL, FancyDescription }) => {

           
            let tr = document.getElementById(MyPhotoFancyNotifyId + "-tr");
            let txtDescriptionSpan = document.getElementById(MyPhotoFancyNotifyId + "-descriptionSpan");
            let imageFromInputFile = document.getElementById(MyPhotoFancyNotifyId + "-image");
            let imageOriginal = document.getElementById(MyPhotoFancyNotifyId + "-imageOriginal");


            //start animation
            tr.classList.add("animate-highlight");
            setTimeout(() => tr.classList.remove("animate-highlight"), 3000);

            txtDescriptionSpan.innerText = FancyDescription;
            imageFromInputFile.src = FancyBase64URL;
            imageOriginal.src = FancyBase64URL;

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

        var myNewPhotoFancyCreateDto = {
            fancyTitle: "",
            fancyBase64URL: "",
            fancyDescription: ""
        };

        myNewPhotoFancyCreateDto.fancyTitle = txtAddItemTitle.value;
        myNewPhotoFancyCreateDto.fancyDescription = "Submitted On: " + getCurrentDateFormated();
        myNewPhotoFancyCreateDto.fancyBase64URL = imageAddItem.src;

         const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(myNewPhotoFancyCreateDto);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/myphotofancycreate", requestOptions);

        txtAddItemResultsSpan.innerHTML = "";
        txtSubmitNewResultsSpan.innerHTML = "";
        addItemFileinputElement.value = "";
        txtAddItemTitle.value = "";
        imageAddItem.src = "";
        btnSubmitNew.className = "btn btn-primary disabled";


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
       
        if(!myConnection.state === "Connected"){
            location.reload();
        }
        else{
              await myConnection.invoke("NotifyNewMyPhotoFancy",
                {
                    MyPhotoFancyNotifyId: parseInt(myUpdatedPhotoFancy.id),
                    FancyBase64URL: myUpdatedPhotoFancy.fancyBase64URL,
                    FancyDescription: myUpdatedPhotoFancy.fancyDescription
                }
            );
            
        };//--End-Else

      

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