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
        
        {data.map(({date, value}) => (
            <div key={date}>
                {date} + {value} + {props.code}
            </div>
        ))}
        </div>
        
    )
}

export default IndexChart;