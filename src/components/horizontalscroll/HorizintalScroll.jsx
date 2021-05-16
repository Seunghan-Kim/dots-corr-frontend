import React from 'react';

import ScrollBox from './ScrollBox';
import ColorCard from './ColorCard';


const HorizontalScroll = (props) => {

    if (props.kind === "top30"){

       let data = codes;

       return(
        <ScrollBox>
        {data.map(({ code, name, 상승률}) =>
        (
          <ColorCard name={name} key={code} 상승률={상승률}/>
        ))}
      </ScrollBox>  

     ) 
    } else {

        let data = themes;

        return(
            <ScrollBox>
            {data.map(({ code, name, 상승률}) =>
            (
              <ColorCard name={name} key={code} 상승률={상승률}/>
            ))}
          </ScrollBox>  
        )
    }
    
    
}

export default HorizontalScroll;

let codes = [

    {"code": "009150", "name": "삼성전자", "상승률":"10.2"},
    {"code": "028050", "name": "삼성엔지니어링", "상승률":"5.2"},
    {"code": "035420", "name": "NAVER", "상승률":"2.2"},
    {"code": "153460", "name": "네이블", "상승률":"-10.2"},
    {"code": "091340", "name": "S&K폴리텍", "상승률":"-5.2"},
    {"code": "010950", "name": "S-Oil", "상승률":"-1.2"},

];

let themes = [

    {"code": "009150", "name": "삼성전자1", "상승률":"10.2"},
    {"code": "028050", "name": "삼성엔지니어링1", "상승률":"5.2"},
    {"code": "035420", "name": "NAVER1", "상승률":"2.2"},
    {"code": "153460", "name": "네이블1", "상승률":"-10.2"},
    {"code": "091340", "name": "S&K폴리텍1", "상승률":"-5.2"},
    {"code": "010950", "name": "S-Oil1", "상승률":"-1.2"},

];