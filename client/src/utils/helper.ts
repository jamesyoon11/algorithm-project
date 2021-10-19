export const download = async function (e, graphState) {
    var pom = e.currentTarget;
    
    let json = {};
    json.walls = graphState.walls;
    json.rowSize = graphState.rowSize;
    json.columnSize = graphState.columnSize;   
    json.startNodeX = graphState.startNode.x;
    json.startNodeY = graphState.startNode.y;
    json.endNodeX = graphState.endNode.x;
    json.endNodeY = graphState.endNode.y;

    let isoDate = new Date().toISOString();
    let date = isoDate.slice(0, 4) + isoDate.slice(5, 7) + isoDate.slice(8, 10) + isoDate.slice(11, 13) + isoDate.slice(14, 16);
    let fileName = json.rowSize + 'x' + json.columnSize + '_' + json.walls.length + (json.walls.length > 1 ? 'walls' : 'wall') + '_board_' + date + '.json'
    pom.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
    pom.setAttribute('download', fileName);
    // pom.click();
};

export const loadBoard = async function(e, callback) {

    e.preventDefault();

    const pickerOpts = {
        types: [
            {
                description: 'JSON',
                accept: {
                    'application/json': ['.json']
                }
            }
        ],
        excludeAcceptAllOption: false,
        multiple: false,
        startIn: 'downloads'
    };

    let fileHandle;

    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    const file = await fileHandle.getFile();
    const contents = await file.text();

    console.log(contents);

    if (typeof callback === 'function') {
        callback(contents, file.name);
    }
};

export const retrieveBoard = async function(files) {

    if (files && files.length > 0) {

        const file = files[0];

        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                console.log(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    // const file = await fileHandle.getFile();
    // const contents = await file.text();

    // var rawFile = new XMLHttpRequest();
    // rawFile.overrideMimeType("application/json");
    // rawFile.open("GET", 'file://', true);
    // rrawFile.onreadystatechange = function() {
    //     if (rawFile.readyState === 4 && rawFile.status == "200") {
    //         console.log(rawFile.responseText);
    //     }
    // }
    // rawFile.send(null);

    // const reader = new FileReader();
    // reader.onload = function(evt) {
    //     console.log(evt.target.result);
    // };
    // reader.readAsText(file);
};

export const getSpeed = function (algorithm, speedLevel) {
    let speed = 1;

    if (algorithm === 'bubble') {
        switch (speedLevel) {
            case 'Very Fast': speed = 1;
                break;
            case 'Fast': speed = 4;
                break;
            case 'Medium Fast': speed = 8;
                break;
            case 'Medium': speed = 10;
                break;
            case 'Medium Slow': speed = 20;
                break;
            case 'Slow': speed = 50;
                break;
            case 'Very Slow': speed = 200;
                break;
            default: speed = 10;
                break;
        }
    }

    if (algorithm === 'shell') {
        switch (speedLevel) {
            case 'Very Fast': speed = 5;
                break;
            case 'Fast': speed = 10;
                break;
            case 'Medium Fast': speed = 20;
                break;
            case 'Medium': speed = 30;
                break;
            case 'Medium Slow': speed = 50;
                break;
            case 'Slow': speed = 80;
                break;
            case 'Very Slow': speed = 200;
                break;
            default: speed = 10;
                break;
        }
    }

    if (algorithm === 'merge') {
        switch (speedLevel) {
            case 'Very Fast': speed = 5;
                break;
            case 'Fast': speed = 12;
                break;
            case 'Medium Fast': speed = 20;
                break;
            case 'Medium': speed = 23;
                break;
            case 'Medium Slow': speed = 30;
                break;
            case 'Slow': speed = 50;
                break;
            case 'Very Slow': speed = 200;
                break;
            default: speed = 40;
                break;
        }
    }

    if (algorithm === 'quick') {
        switch (speedLevel) {
            case 'Very Fast': speed = 3;
                break;
            case 'Fast': speed = 8;
                break;
            case 'Medium Fast': speed = 12;
                break;
            case 'Medium': speed = 18;
                break;
            case 'Medium Slow': speed = 40;
                break;
            case 'Slow': speed = 100;
                break;
            case 'Very Slow': speed = 200;
                break;
            default: speed = 10;
                break;
        }
    }

    if (algorithm === 'heap') {
        switch (speedLevel) {
            case 'Very Fast': speed = 5;
                break;
            case 'Fast': speed = 12;
                break;
            case 'Medium Fast': speed = 18;
                break;
            case 'Medium': speed = 23;
                break;
            case 'Medium Slow': speed = 40;
                break;
            case 'Slow': speed = 100;
                break;
            case 'Very Slow': speed = 200;
                break;
            default: speed = 10;
                break;
        }
    }

    return speed;
};