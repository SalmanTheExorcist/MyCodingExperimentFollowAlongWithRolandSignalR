
const myInitializeMyFancyPlaygroundPageStuff = function () {
    logToConsole("Inside: myInitializeMyFancyPlaygroundPageStuff()");
}

const submitFancyPhoto = function (singleMyPhotoFancyId) {
    logToConsole(`submitFancyPhoto(): ${singleMyPhotoFancyId}`);

    // const bid = document.getElementById(auctionId + "-input").value;
    // fetch("/auction/" + auctionId + "/newbid?currentBid=" + bid, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    // location.reload();
}
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
    else{
        //--disable the submit button
        btnSubmitFancyPhoto.className = "btn btn-primary disabled";
    };


}
//--------------------------------------------------------