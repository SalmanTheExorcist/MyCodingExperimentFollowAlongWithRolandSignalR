
var strImageBase64 = "";
const myInitializeImageRelatedStuff = function(){
   logToConsole("Inside: myInitializeImageRelatedStuff()");
   const allowedExtensions =  ['jpg', 'jpeg', 'png', 'gif'];
 
  
   let fileSomeImage = document.getElementById("fileSomeImage");

  fileSomeImage.addEventListener("change",function(event){

      
      var singleFile = event.target.files[0];
      var singleFileName = singleFile.name.toLowerCase();
      var singleFileExtension = singleFileName
                      .substring(singleFileName.lastIndexOf('.') + 1);

      var txtOutputMessage = "";
      var boolFileIsGoodToGo = true;

      if(allowedExtensions.includes(singleFileExtension)){
        txtOutputMessage += "File extention is Good<br/>";
        if(singleFile.size > 10000000){
          txtOutputMessage += "File Size Exceeds 10MB<br/>";
          boolFileIsGoodToGo = false;
        }
      }
      else{
        txtOutputMessage += `File extension ${singleFileExtension} Not Allowed!`;
         boolFileIsGoodToGo = false;
      };          

      setResultsInnerText(txtOutputMessage);

       let imageFromInputFile = document.getElementById("imageFromInputFile");
       imageFromInputFile.src = "";
       strImageBase64 = "";
       
      if(boolFileIsGoodToGo){
        //Do more stuff with the selected File/Picture
          var myFileReader = new FileReader();
        

          myFileReader.onload = function(e){
            strImageBase64 = e.target.result;           
            imageFromInputFile.src = strImageBase64;                                                                  
          };
          myFileReader.readAsDataURL(singleFile);     

      };
    
  });

 

}
/* ----------------------------------------------------- */
function btnPrintBase64_click(){
  logToConsole(strImageBase64);
}


/* ------------------------------------------------------ */
function setResultsInnerText(strValue){
  console.log(`setResultsInnerText(strValue): ${strValue}`);

   let txtResultsFileSelection = document.getElementById("txtResultsFileSelection");
   txtResultsFileSelection.innerHTML = strValue;
}

/* ------------------------------------------------------- */
