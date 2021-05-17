import React from 'react';

const IndexChart = (props) => {
    const data = props.data
    return(
        <div style={{
            backgroundColor:'yellow',
            height : '100px',
            width : '200px',
            margin : '5px'}}
            
            key={props.date}>
        
        {data.map(({date, value}) => (
            <div>
                {date} + {value} + {props.code}
            </div>
        ))}
        </div>
        
    )
}

export default IndexChart;