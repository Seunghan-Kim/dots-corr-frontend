import React from 'react';
import CorrValueIn from './CorrValueIn'
import '../css/CorrValue.css'

const CorrValue = (data) => {
    let data2 = data.data
    console.log('a', data2);
    return(
        <div className='corrCardContainer'>
         { 
            data2.map(({Name, base, Sector})=> (
                <CorrValueIn name={Name} base={base} sector={Sector}/>
            ))
        
         }
        </div>  
      ) 
}

export default CorrValue;