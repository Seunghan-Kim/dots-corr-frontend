import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCardCorr from './ColorCardCorr';


const HorizontalScrollCorr = ({data, clickHandler}) => {

  if (data.length !== 0) {

    let totalNumOfCards = data.length
    console.log(totalNumOfCards)
    
    let codeList = []

    return(
      <ScrollBox>
        {data.map((v, i) => {
          if (!codeList.includes(v.code)){
            codeList.push(v.code);
            if (v.n_days > 0) {
              return(
                <ColorCardCorr 
                  key={v.code + v.date + v.n_days}
                  name={v.Name}
                  date={v.date}
                  n_days={v.n_days}
                  sector={v.Sector}
                  corr_value={v.corr_value}
                  clickHandler={clickHandler}
                  num={i}
                  total={totalNumOfCards}
                  code={v.code}/>
                  )
            }
          }
        })}
      </ScrollBox>  
    )
  } else {
    return(
      
        <div>Nothing to show</div>
      
    )
  }
}

export default HorizontalScrollCorr;