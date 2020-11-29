import React from 'react';

const Navigation = () => {
	return(
			<nav style={{display:'flex', justifyContent: "flex-end", paddingRight:"2rem"}}>
				<p className="f3 link grow black pa3 pointer br2 shadow-2"><strong style={{color: "rgb(112,112,112)"}}>Sign Out</strong></p>
			</nav>
		);
}

export default Navigation; 