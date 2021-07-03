import React from 'react';

const Top30ofTheDay = ({data, code}) => {
    let selectedTop30 = code.code
    return (
        <div className="top30Items">
            {data.map((d)=>{
                return (
                    <div className={selectedTop30 === d.code ? "selectedItem" : "unSelectedItem"} ></div>
                )
            })}
        </div>
    )
}

export default Top30ofTheDay;