import './App.css';
import Navigation from './components/navigation/Navigation.js'
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react';

import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from "./components/SignIn/SignIn.js"
import Register from "./components/Register/Register.js"

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



const initialState = {"url": "",
                      "input": "",
                      "boxes":{},
                      "route": 'signin',
                      "isSignedIn":false, 
                      user: {
                        id: '', 
                        name:'', 
                        email:'', 
                        entries: 0, 
                        joined: '', 
                      }, 
}; 


class App extends Component{
  constructor(){
    super();
    this.state = {"url": "",
                  "input": "",
                  "boxes":{},
                  "route": 'signin',
                  "isSignedIn":false, 
                  user: {
                    id: '', 
                    name:'', 
                    email:'', 
                    entries: 0, 
                    joined: '', 
                  }, 
                  };
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name, 
      email: data.email, 
      entries: data.entries, 
      joined: data.joined,}  

    })
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
    this.setState({"boxes":boxes}); 
    
  }

  onInputChange = (event) => {
    this.setState({"input": event.target.value})
  }

  onClick = () => {
    this.setState({"url": this.state.input});
      fetch('https://enigmatic-castle-90416.herokuapp.com/imageurl', {
        method: 'post', 
        headers:{'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          input: this.state.url
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response){
            fetch('https://enigmatic-castle-90416.herokuapp.com/image', {
              method: 'put', 
              headers:{'Content-Type': 'application/json'}, 
              body: JSON.stringify({
                id: this.state.user.id
              })
            }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries: count} ))
            }).catch(console.log)
          }
          this.displayFaceBoxes(this.calculateFaceLocation(response))})
        .catch(err => console.log(err));
  }

  onRouteChange = (param) => {
      if (param === 'signout'){
        this.setState(initialState)
      }else if (param === 'home'){
        this.setState({"isSignedIn":true})
      }
    this.setState({"route":param})
  }

  render(){
  return (
    <div className="App">
    <Particles 
    className="particles"
    params={particleOptions}/>

    <Navigation route={this.state.route} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} className = "App" style= {{display:'flex', justifyContent:'flex-end'}}/>
    { this.state.route ==='home'
      ? <div>
          <Logo style = {{display:'flex', 'align-self': 'flex-start'}} />
          <FaceRecognition  url = {this.state.url} boxes={this.state.boxes}/>
          <Rank name = {this.state.user.name}
          entries={this.state.user.entries} 
          style = {{display:'flex', justifyContent: 'center', topPadding: "0px"}} />
          <ImageLinkForm 
          onClick={this.onClick} 
          onInputChange = {this.onInputChange}/>
       </div> 
      :(this.state.route === "signin" 
      ?<SignIn 
      loadUser = {this.loadUser}
       onRouteChange={this.onRouteChange}/> 
      :<Register onRouteChange={this.onRouteChange}
      loadUser= {this.loadUser}
      />)
       
    }
    </div>  
  );
  }
}
export default App;



