import React from 'react';
import './Rank.css'



const Rank  = ({name, entries})  => {
    return(
        <div className="absolute">
            <div className="relative">
                <div className='myShadow white f3'>
                    {`${name}, your current entry count is:` }
                </div>
                <div className='myShadow white f2 '>
                    {entries}
                </div>
            </div>
        </div>
    );
}

export default Rank; 