import PrintTracker from "./PrintTracker";

const GenerateHTML =(entries)=> {
    var compiledHTML;
    var printArray = [];  

    entries.forEach(entry => {
        var toPrint = ``; 
        toPrint = PrintTracker(entry.trackerName, entry.trackerType, entry.date, entry.scale, entry.input); 
        printArray.push(toPrint); 
    }); 

    printArray.forEach(element => {
        compiledHTML += element; 
    });
    return compiledHTML; 
}

export default GenerateHTML; 