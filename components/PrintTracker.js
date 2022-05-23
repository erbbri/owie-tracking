

const PrintTracker =(trackerName, trackerType, date, value, text)=> {
    var toReturn; 
    if (trackerType == "checkbox"){
        toReturn = `
        <div style="outline: 2px solid grey">
        <p style="padding-left: 5px"> 
        <span style="color: #6e9979;">` + date + `</span> <br>
        &#x2611 ` + trackerName + ` <br>
        </p>
        </div>`
    }
    if (trackerType == "text"){
        toReturn = `
        <div style="outline: 2px solid grey">
        <p style="padding-left: 5px">
        <span style="color: #6e9979;">` + date + `</span> <br>
        ` + trackerName + ` <br>
        <span style="color: gray">` + text + `</span>
        </p>
        </div>`
    }
    if (trackerType == "slider"){
        toReturn = `
        <div style="outline: 2px solid grey">
        <p style="padding-left: 5px"> 
        <span style="color: #6e9979;">` + date + `</span> <br>
        ` + trackerName + ` <br>
        <span style="color: gray">Slider Value: ` + value + `</span>
        </p>
        </div>`
    }
    return toReturn; 
}

export default PrintTracker; 