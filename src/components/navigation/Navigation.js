import React from 'react';
import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
	
		if(isSignedIn){
			return (
			<nav style={{display:'flex', justifyContent: "flex-end", paddingRight:"2rem"}}>	
				<p onClick={() => onRouteChange('signout')} className="f3 link grow black pa3 pointer br2 shadow-2"><strong style={{color: "rgb(112,112,112)"}}>Sign Out</strong></p>	
			</nav>)
		} else {
			return(
			<nav style={{display:'flex', justifyContent: "flex-end", paddingRight:"2rem"}}>	
				<div>
				<p id="padding" onClick={() => onRouteChange('signin')} className="f3 link grow black pa3 pointer br2 shadow-2"><strong style={{color: "rgb(112,112,112)"}}>Sign in</strong></p>	
				</div>
				<div>
				<p id="padding" onClick={() => onRouteChange('register')} className="f3 link grow black pa3 pointer br2 shadow-2"><strong style={{color: "rgb(112,112,112)"}}>Register</strong></p>
				</div>
			</nav>
			
			)
		}
}

export default Navigation; 