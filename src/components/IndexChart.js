import React from 'react';

const IndexChart = (props) => {
    const data = props.data
    return(
        <div style={{
            backgroundColor:'yellow',
            height : '100px',
            width : '200px',
            margin : '5px'}}
            
            >
        
        {data.map(({종가, date}) => (
            <div key={date}>
                {종가} + {date} + {props.code}
            </div>
        ))}
        </div>
        
    )
}

export default IndexChart;