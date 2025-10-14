(function(){
    'use strict'
  
   
    const timestamp = Date.now();

    // Convert timestamp to a readable date and time format
    const currentDate = new Date(timestamp);

    // Formatting date 
    const formattedDate = currentDate.toLocaleString();


    console.log(`Inside site.js: ${formattedDate}`);

 

})();
