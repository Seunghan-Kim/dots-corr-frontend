import React from 'react';

import Top30ofTheDay from './Top30ofTheDay';

const Top30HistoryWrapper = ({data, code}) => {
    if (data) {
        return(
            <div className='oneDayContainer'>
                {data.map((d, i)=>{

                    if ((i+1)%5 && i < 19) {
                        return(
                            
                                <Top30ofTheDay data={d} code={code}/>
                            
                            )    
                    } else {
                        return(
                            <div className="line">
                            <Top30ofTheDay data={d} code={code}/>
                            </div>
                        ) }
                                                           
                    })
                }
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Top30HistoryWrapper;