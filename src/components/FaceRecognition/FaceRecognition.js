import React from 'react';
import './FaceRecognition.css';

const recognitionBoxes =(boxes) => {
    let boxComponents = [];
    for (let i=0; i<boxes.length; i++){
        boxComponents.push( <div className="bounding-box" style={{top:`${boxes[i].topRow}px` , right: `${boxes[i].rightCol}px`, bottom: `${boxes[i].bottomRow}px`, left:`${boxes[i].leftCol}px`}}></div>)
    }
    return boxComponents;
}


const FaceRecognition  = ({boxes,url})  => {
    const myBoxes = recognitionBoxes(boxes);
    return(
        <div className="top absolutee">
            <div className="center">
                <div className="relative">
                    <img id="inputimage" className="size br3 shawdow-4" alt='' src={url}/>
                    {myBoxes.map(box => box)}
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition; 

// // style={{top: boxes[0].topRow, right:boxes[0].rightCol, bottom: boxes[0].bottomRow, left: boxes[0].leftCol}}
// <div className="bounding-box" style={{top:`${boxes[0].topRow}px` , right: `${boxes[0].rightCol}px`, bottom: `${boxes[0].bottomRow}px`, left:`${boxes[0].leftCol}px`}}></div>   