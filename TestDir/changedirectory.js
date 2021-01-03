
/* From a specific directory, one with a file size of 1 byte or more,
A program that extracts the directory  structure as it is in another directory. */


// Set src as a reference, dist as a spit
const COPY_SRC = './Source';
const COPY_DIST = './Dist';


// Copy the Source directory to the Dist directory
const fs = require('fs-extra');
const path = require('path');
fs.copySync(COPY_SRC, COPY_DIST);


//Get the list of file
fs.readdir('.', function (err, files) {
  if (err) {
    console.error(err);
  } else {
    console.log(files);
  }
});

// enumerate the files in the folder including the subfolder
// Target Directory
var dirTarget = COPY_DIST; 
// The information which want to write
var text = ''; 
// Definition of getFiles function
(function getFiles(dir){
    var files = fs.readdirSync(dir); 
    // get the file and subdirectory in specific directory
    files.forEach(function(file){ 
        // get the full path
        var fullPath = path.join(dir, file); 
        // get the information from directory or file
        var stats = fs.statSync(fullPath) 
        // If it is directory
        if(stats.isDirectory()){ 
            // recursively call getFiles function
            getFiles(fullPath); 
            // If it is file
        }else{ 
            // get the file information
            console.log(fullPath)
            // filename
            text += file 
                // filesize:byte
                + ',' + stats.size 
                + '\n'; 
        // If the file size is less than 1byte, then delete
        if(stats.size<1.0){
    fs.unlinkSync(fullPath);}
　　　　 }   
    });
})(dirTarget);
