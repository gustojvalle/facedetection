import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm  = ({onClick , onInputChange})  => {
    return(

        <div>
            <div className="adjusting ma4 mt0" >
                <p className='myShadowWhite f3 tc'>
                    <strong style ={{color: "rgb(112,112,112)"}}>{'This magic brain will detect faces in your pictures'}</strong>
                </p>
                <div className="center">
                    <div className="form pa4 br3 shadow-5 center">
                        <input className="f4 pa2 w-70 center tc br3 shadow-2" 
                        placeholder="Url goes here!" 
                        style={{border:'none',opacity:0.9}} 
                        type ='tex'
                        onChange={onInputChange}/>
                        <button className="button-color w-30 grow f4 link ph3 pv2 dib white shadow-2 br3" 
                        style={{border:'none', opacity:0.9}}
                        onClick = {onClick}>
                        <strong>Detect</strong>
                        </button>
                    </div>    
                </div>
            </div>
        </div>   
        );
}

export default ImageLinkForm; 