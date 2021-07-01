import React, { useState, useEffect } from 'react';

import HorizontalScroll from './horizontalscroll/HorizintalScroll';
import HorizontalScrollCorr from './horizontalscroll/HorizintalScrollCorr';
import ScrollBoxChart from './horizontalscroll/ScrollBoxChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Button from '@material-ui/core/Button';
import '../css/ItemThemeView.css';

const today = new Date()
const yesterday = new Date(today)

let now = new Date(); // 나중에 수정하자

yesterday.setDate(yesterday.getDate() - 1)

today.toDateString()
yesterday.toDateString()

let hourMin = String(today.getHours()) + String(today.getMinutes()).padStart(2, '0');

const setToday = () => {
    console.log(hourMin)
    if (parseInt(hourMin) < 904) {
        console.log('early')
        now = yesterday
        return (
            getDateFormat(yesterday)
        )
    } else {
        now = today
        return (
            getDateFormat(today)
        )
    }
}

const getDateFormat = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = String(date.getFullYear());

    return yyyy + mm + dd
}

let refDate = setToday();

console.log(refDate)

const ItemThemeView = () => {


    // const backendUrl = 'http://localhost:8080/';
    const backendUrl = 'https://backend-v31-s5icpxfxda-uc.a.run.app/'

    const [top30ListData, setTop30ListData] = useState([]);
    const [corrListData, setCorrListData] = useState([])

    const [selectedTop30, setSelectedTop30] = useState({});
    const [selectedCorr, setSelectedCorr] = useState({});

    const [top30NewsList, setTop30NewsList] = useState();
    const [corrNewsList, setCorrNewsList] = useState();

    const [top30PriceData, setTop30PriceData] = useState([]);
    const [corrPriceData, setCorrPriceData] = useState([]);
    const [dateRef1, setDateRef] = useState(refDate);
    

    useEffect(() => { //시작할때 데이터 불러오기 + 종목, 테마 데이터 불러오기
        fetch(`${backendUrl}topitems/${dateRef1}`)
        .then(response => response.json())
        .then(json => {
            setTop30ListData(json.data);
            console.log('top30List set')
        })        
        } , [dateRef1]) 
        
    useEffect(() => { //종목 데이터 다 들어오면 첫번째 종목코드 선정하고 차트를 위한 데이터 불러오기
        if (top30ListData.length !== 0) {
            console.log(top30ListData[0])
            let code = top30ListData[0].code
            let name = top30ListData[0].name
            setSelectedTop30({'code':code, 'name':name})
        }
    }, [top30ListData])

    useEffect(() => {
        console.log('1-1')
        if (selectedTop30.code) {
            console.log('1-2')
            getPriceData(selectedTop30.code, 'top30')
            getCorrListData(selectedTop30.code, 'n_days')
        }        
    },[selectedTop30])

    useEffect(()=>{
        console.log('2-1')
        if (selectedCorr.code){
            console.log('2-2')
            getPriceData(selectedCorr.code, 'corr')            
        }
    },[selectedCorr])

    useEffect(() => {
        console.log('corrList set', corrListData[0])
        if (corrListData.length !== 0) {
            console.log('corrListData updated')
            setSelectedCorr({'code':corrListData[0].code, 'name':corrListData[0].Name})
        }
    }, [corrListData])

    useEffect(() => {
        if (top30PriceData.length !== 0) {
            getGoogleNewsHeader('top30');
        }
    }, [top30PriceData])

    useEffect(() => {
        if (corrPriceData.length !== 0) {
            getGoogleNewsHeader('corr');
        }
    }, [corrPriceData])

    const getGoogleNewsHeader = async (kind) => {
        let keyword;
        if (kind === 'top30') {
            keyword = selectedTop30.name
        } else {
            keyword = selectedCorr.name
        }
        let url = `${backendUrl}news/`;
        let body = {"keyword" : keyword};

        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(response => response.json())
        .then(json => {
            console.log('news results', json.data);
            if (kind === 'top30') {
                let trimmed = json.data.slice(0,5)
                setTop30NewsList(trimmed)
            } else {
                let trimmed = json.data.slice(0,5)
                setCorrNewsList(trimmed)
            }
        })
    }

    const getPriceData = (code, kind) => {
        console.log('getPriceData', code)
        let url = `${backendUrl}chartdata_top30`
        let newCode = {'code' : code, 'date': dateRef1}
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCode)
        }).then(response => response.json())
          .then(json => {  
            
            if (kind === 'top30') {
                console.log('top30 price data called')
                setTop30PriceData(json.data)
            } else {
                setCorrPriceData(json.data)
                console.log('Corr price data called')
            }            
          }) 
    }

    const getCorrListData = (code, sortOrder) => {
        console.log('getCorrData', code)
        let sortType = sortOrder
        
        if (!sortType){
            sortType = ''
        } 
        let fetchUrl = `${backendUrl}corr2/${code}/${sortOrder}`
        fetch(fetchUrl)
        .then(response => response.json())
        .then(json => {            
            setCorrListData(json.data)
            console.log('corr', json.data)
        })
    }

    const decreaseDate = () => {

        now.setDate(now.getDate() - 1)

        let newDate = getDateFormat(now)
        setDateRef(newDate)
        console.log('back')
        console.log('one day before', now)
    }

    const increaseDate = () => {
        now.setDate(now.getDate() + 1)
        let newDate = getDateFormat(now)
        setDateRef(newDate)
        console.log('forward')
        console.log('one day after', now)
    }
    
    const resortCorrCard = (sortOrder) => {
        getCorrListData(selectedTop30.code, sortOrder);
    }

    const top30ClickHandler = (code, name) => {
        console.log('clicked', code, name)
        setSelectedTop30({'code':code, 'name':name})
    }

    const corrClickHandler = (code, name) => {
        console.log('corr card clicked', code, name)
        setSelectedCorr({'code':code, 'name':name})
    }

    const NewsList = ({data}) => {
        // let data = Array orgData;
        console.log('aa', data)
        if (data) {
            console.log('bb')
            return (

                <ul>
                    {data.map((item) => (<li className="newHeaderText">{item.title}</li>))}
                </ul>
            )
        } else { return (
            <div>Loading...</div>
            )}
        
    }

    return(
        <div className='mainContainer'>
            <ScrollBoxChart>
            <div className='chartContainer'>                
                <div className='chartItemName'>{selectedTop30.name}</div>
                <LineChart
                    width={360}
                    height={150}
                    data={top30PriceData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    fontSize={10}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis type="number" domain={['auto', 'auto']}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" dot={false}/>
                </LineChart>
                <div className='chartItemName'>{selectedCorr.name}</div>
                <LineChart
                    width={360}
                    height={150}
                    data={corrPriceData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                    }}
                    fontSize={10}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis type="number" domain={['auto', 'auto']}/>
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    <Line type="monotone" dataKey="종가" stroke="#82ca9d" dot={false}/>
                </LineChart>
            </div>
            <div className="newsContainer">
                <div className="top30NewsContainer">
                    <NewsList data={top30NewsList}/>
                </div>
                <div className="CorrNewsContainer">
                    <NewsList data={corrNewsList}/>
                </div>
            </div>
            </ScrollBoxChart>
            <div className='itemScrollBoxContainer'>           
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{selectedTop30.name}</div>
                    <div className='top30HeaderText'>와 주가 변동이 비슷한 종목들</div>
                </div>
                <HorizontalScrollCorr data={corrListData} clickHandler={corrClickHandler}/>   
            </div>

            <div className='resortCorrCardBtnContainer'>
                <Button variant="contained" color="primary" onClick={()=>resortCorrCard('n_days')}>n_days</Button>
                {/* <Button variant="contained" color="primary" onClick={()=>resortCorrCard('')}>Re-sort</Button> */}
            </div>

            <div className='itemScrollBoxContainer'>
                <div className='top30HeraderContainer'>
                    <div className='top30DateText'>{dateRef1.slice(4,8)}</div>
                    <div className='top30HeaderText'>상승률 TOP30</div>
                </div>
                <HorizontalScroll data={top30ListData} clickHandler={top30ClickHandler}/>
            </div>

            <div className='dateSelectorContainer'>
                <Button variant="contained" onClick={()=>decreaseDate()}>뒤로</Button>
                <div className='dateText'>{dateRef1}</div>
                <Button variant="contained" color="primary" onClick={()=>increaseDate()}>앞으로</Button>
            </div>
        </div>
    )
}

export default ItemThemeView;
