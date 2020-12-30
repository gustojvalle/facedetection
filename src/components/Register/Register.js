import React from 'react';

class  Register extends React.Component  {

    constructor(props){
        super(props); 
        this.state = {
            name: '',
            registerEmail: '',
            registerPassword : '', 
        }
    }

    onRegister = (event) => {
        fetch("http://enigmatic-castle-90416.herokuapp.com/register", {
            method: 'post', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                email: this.state.registerEmail, 
                password: this.state.registerPassword, 
                name: this.state.name, 
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
             this.props.loadUser(user);
             this.props.onRouteChange('home');
            }
        })
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});  
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});  
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value}); 
    }


render () {
    
    return(
        <article className="mw5 center transparent br3 pa3 pa4-ns mv3 ba b--black-10 shadow-2">
            <main className="pa4 black-80">
                <div className="measure">
            <fieldset id="sign_up" 
            className="ba b--transparent ph0 mh0">
            <div className ="center">
              <legend className="tc f4 fw6 ph0 mh0">Register</legend>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" form="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="text" 
                 name="name" 
                  id="name"
                  onChange={this.onNameChange}/>
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" form="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="email" 
                 name="email-address" 
                  id="email-address" 
                  onChange= {this.onEmailChange}/>
            </div>
            <div className="mv3">
                <label 
                className="db fw6 lh-copy f6" 
                form="password">Password</label>
                <input className="b 
                pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password"
                onChange = {this.onPasswordChange} />
            </div>
        </fieldset>
        <div className="">
            <input
            onClick ={() => this.onRegister()} 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit"
            value="Register"/>
        </div>
            </div>
        </main>
        </article>


    );}
}

export default Register; 