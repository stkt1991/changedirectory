
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
var dirTarget = COPY_DIST; // Target Directory
var text = ''; // The information which want to write

// Definition of getFiles function
(function getFiles(dir){
    var files = fs.readdirSync(dir); // get the file and subdirectory in specific directory
    files.forEach(function(file){ 
        var fullPath = path.join(dir, file); // get the full path
        var stats = fs.statSync(fullPath) // get the information from directory or file
        if(stats.isDirectory()){ // If it is directory
            getFiles(fullPath); // recursively call getFiles function
        }else{ // If it is file
            // get the file information
            console.log(fullPath)
            text += file // filename
                + ',' + stats.size // filesize:byte
                + '\n'; 
            // If the file size is less than 1byte, then delete
        if(stats.size<1.0){
    fs.unlinkSync(fullPath);}
　　　　 }   
    });
})(dirTarget);