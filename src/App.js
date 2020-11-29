import './App.css';
import Navigation from './components/navigation/Navigation.js'
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const particleOptions={
  particles: {
    color:"#000000",
    line_linked:{
      color: "#000000"
    },
    number:{
      value:100,
      density: {
        enable:true,
        value_area:700,
      }
    }
},
interactivity: {
  onhover:{
    enable: true, 
    mode: `repulse`,
  },
  detect_on: "canvas"
},
}


//Setting upp the API to call 
const app = new Clarifai.App({
  apiKey: '9a747812debe41e3afb5bbb14aed1936'
 });



class App extends Component{
  constructor(){
    super();
    this.state = {"url": "",
                  "input": "",
                  "boxes":{0:
                    {leftCol: 0,
                    topRow: 0,
                    rightCol:0,
                    bottomRow: 0}
                  }
                  };
  }

  calculateFaceLocation = (data) => {
    const faces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const final = faces.map((face) =>{ 
      const image = document.getElementById('inputimage');
      const myObj = {leftCol: face.left_col*image.width,
                      topRow: face.top_row*image.height,
                      rightCol: image.width - face.right_col*image.width,
                      bottomRow: image.height - face.bottom_row*image.height}
      return myObj;});
    return final;
  }

  displayFaceBoxes = (boxes) => {
    console.log(boxes)
    this.setState({"boxes":boxes}); 
    console.log(this.state.boxes[0]);
    
  }

  onInputChange = (event) => {
    this.setState({"input": event.target.value})
  }

  onClick = () => {
    this.setState({"url": this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,`${this.state.input}`,{maxConcepts:1})
        .then(response => this.displayFaceBoxes(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  }

  render(){
  return (



    <div className="App">
    <Particles 
    className="particles"
    params={particleOptions}/>

    <Navigation className = "App" style= {{display:'flex', justifyContent:'flex-end'}}/>
    <Logo style = {{display:'flex', 'align-self': 'flex-start'}} />
    
    
      <FaceRecognition  url = {this.state.url} boxes={this.state.boxes}/>
      <Rank style = {{display:'flex', justifyContent: 'center', topPadding: "0px"}} />
      <ImageLinkForm onClick={this.onClick} onInputChange = {this.onInputChange} / >
  
    </div>  
  );
  }
}
export default App;



