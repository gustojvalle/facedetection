import React, {Component} from 'react';
import './SignIn.css'



class SignIn extends Component{
    
    constructor(props){
        super(props);
        this.state = {signinEmail: '',
                        signinPassword: '',
                    }
    }

    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});  
    }

    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value});  
    }

    onSubmitSignIn = () => {
        fetch("http://192.168.56.1/8560/signin", {
            method: 'post', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                email: this.state.signinEmail, 
                password: this.state.signinPassword
            })
        })
        this.props.onRouteChange('home');
    }


    render(){
        const {onRouteChange} = this.props  
      return(
        <article className="mw5 center transparent br3 pa3 pa4-ns mv3 ba b--black-10 shadow-2">
        <main className="pa4 black-80">
            <form className="measure">
        <fieldset id="sign_up" 
        className="ba b--transparent ph0 mh0">
        <div className ="center">
            <legend className="tc f4 fw6 ph0 mh0">Sign In</legend>
        </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" form="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                 type="email" 
                 name="email-address" 
                  id="email-address" 
                  onChange = {this.onEmailChange}
                  />
            </div>
            <div className="mv3">
                <label 
                className="db fw6 lh-copy f6" 
                form="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                onChange = {this.onPasswordChange}
                type="password" 
                name="password"  
                id="password" />
            </div>
        </fieldset>
        <div className="">
            <input
            onClick ={() => this.onSubmitSignIn()} 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit"
             value="Sign in"/>
        </div>
        <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} href="#0" className="f6 pointer link dim black db">Register</p>
        </div>
            </form>
        </main>
        </article>


    );}
}

export default SignIn; 