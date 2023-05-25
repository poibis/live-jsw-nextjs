import Layout from '../components/Layout';
import React, { useEffect, useState, useRef } from 'react';
import * as config from './config/env.js';
import KakaoMap from './kakao_map.js';

const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const controller = new AbortController();
  const serviceKey = config.JSW_DATA_KEY;

  // 구로구 주요 포인트 날씨 예보 조회 서비스 
  // https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15095628

  // 55페이지 기준 바로 직후 1시간
  const url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';  /* URL */
  let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ serviceKey;                 /* 공공데이터포털에서 발급받은 인증키 */
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml');    /* 데이터 표출방식 xml */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');      /* 한 페이지 결과 수 */
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('10');          /* 페이지 번호 */

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const res = await fetch(url+queryParams, {
      method: 'GET', // *GET, POST, PUT, DELETE 등
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  
      timeout: 8000,
      signal: controller.signal
    });
    
    const xmlDoc = await res.text();
    const parseXML = new XMLParser();
    let jObj = parseXML.parse(xmlDoc);
    const xmlContent = JSON.parse((JSON.stringify(jObj.response.body.items.item)));
  
    const xmlReturnCode = jObj.response.header.resultCode;
    const xmlReturnMsg = jObj.response.header.resultMsg;
  
    let xmlReturnValue = Object();
    xmlReturnValue[xmlReturnCode] = xmlReturnMsg;

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
  

    return {
      props: {
        xmlReturnValue,
        xmlContent,
      },
    }

  } catch (e) {
    console.log(e);
  }

}


export default function weather(rsv) {

  const mapUri = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.JSW_KAKAO_KEY}&autoload=false`;

  const [isHour, setIsHour] = useState(10);
  const mounted = useRef(false);

  const changeTime = (val) => {
    mounted.current = true;
    if( (isHour < 2 && val === 'minus') || (isHour > 54 && val === 'plus') ) return alert('마지막 페이지입니다.');
    else return val == 'minus' ? setIsHour(isHour-1) : setIsHour(isHour+1);
  }


  useEffect( ()=> {

    console.log('update 되었다 무언가');
    // tester code
    (async () => {

      const fetch_uri = weather_dta_chg(isHour);
      const res = await fetch(fetch_uri);

      if(res.ok) {
        const fetchedData = await res.text();
        const parseXML = new XMLParser();
        let jObj = parseXML.parse(fetchedData);
        const xmlContent = JSON.parse((JSON.stringify(jObj.response.body.items.item)));
        rsv = xmlContent;
        console.log(rsv);
      }
    }) ();
    // tester code


    return () => {
      const weatherF = rsv;
    }

  }, [isHour]);

  const returnKey = Object.keys(rsv['xmlReturnValue']);
  const returnValue = Object.values(rsv['xmlReturnValue']);
  let v2 = "test";
  let listC = new Array();
  let listHeader = new Array();

  let listB = new Object();

  if('0' in rsv['xmlReturnValue'] == false) {
    returnMsg = `<div style="display:flex; flex-direction: column; align-items: center;"><div><svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="caution-sign-circle" xmlns="http://www.w3.org/2000/svg" class="icon line"><line id="primary-upstroke" x1="11.95" y1="16.5" x2="12.05" y2="16.5" style="fill: none; stroke: rgb(255, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.95;"></line><path id="primary" d="M3,12a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0a9,9,0,0,1-9,9h0a9,9,0,0,1-9-9Zm9,0V7" style="fill: none; stroke: rgb(255, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></svg></div>
<div class="box-caution">ERROR_CODE : ${returnKey[0]}
${returnValue[0]}
이용에 불편을 드려 죄송합니다.
관리자에 문의 바랍니다.</div>
</div>`;
    v2 = 'red';
  } else {
    rsv['xmlContent'].map( (item, index) => {
      listB = {};
      listB.localCode = areaChange(item.localCode);
      listB.iconNo = item.iconNo;
      listB.temp = item.temp;
      listB.humi = item.humi;
      listB.rainProb = item.rainProb;
      listB.rain = item.rain;
      listB.windDir = item.windDir;
      listB.windSpeed = item.windSpeed;
      listC.push(listB);

      const areaTitle = areaChange(item.localCode);

      
      if(index == 0) {
        listHeader.push(item.baseDate);
        listHeader.push(item.fcsDate);
      }
    })

    v2 = 'dark';

  }

  const weatherF = listC;
  return (
    <>
      <Layout></Layout>
      <script type="text/javascript" defer src={mapUri} />

      <div style={{width: "100%", margin: "auto", textAlign: "center"}}>
{/* { vvisibility == "hidden" ? setVisibility("visible") : setVisibility("hidden")} */}
{/* style={{"visibility":vvisibility}} */}
        {/* <div>발표일 : <Date dateString={listHeader[0]} /></div> */}
        <div className="">발표일 : {setupDateform(listHeader[0])} / 기준 : {isHour}</div>
        <div className="flex max-w-xl mx-auto bg-white items-center">
          <div className='flex-initial box-shaping' onClick={ () => {changeTime('minus')} }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg></div>
          <div className='flex-initial'>예보일 : {setupDateform(listHeader[1])}</div>
          <div className='flex-initial box-shaping' onClick={ () => {changeTime('plus')} }><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></div>
        </div>
        <div className={`max-w-xl mx-auto bg-white overflow-x-auto overflow-y-hidden md:flex-col md:max-w-6xl  ${v2}`} style={{textAlign: "center", margin: "auto"}}>
          {weatherF.map( (item, index)=> (
            <div key={index} className="md:flex box-shaping shadow-md rounded-xl auto-cols-auto grid grid-cols-4 gap-4 mb-8">
              
              <div className="col-span-4 max-w-xs overflow-hidden m-auto">지역 : {item.localCode.rtLo} <ToggleBtnComponent rtLo={item.localCode.rtLo} rtOn={item.localCode.rtOn} rtAt={item.localCode.rtAt} idx={index}></ToggleBtnComponent></div>
              <div>날씨 : <img src={"/weather_con/"+item.iconNo+".png"} title={item.iconNo} style={{width:"18px", height:"18px", display:"inline-block", verticalAlign:"middle"}}/></div>
              <div>기온 : {item.temp} ℃</div>
              <div>습도 : {item.humi} %</div>
              <div>강수확률 : {item.rainProb} %</div>
              <div>강수량 : {item.rain} mm</div>
              <div dangerouslySetInnerHTML={ {__html: IconChange( item.windDir )}}></div>
              <div>풍속 : {item.windSpeed} m/s</div>
            </div>
          ))}
        </div>

        <br/>
        <div className="box-shaping">test</div>


      </div>
    </>

  )
}

function weather_dta_chg(num) {
  const serviceKey = config.JSW_DATA_KEY;
  // 55페이지 기준 바로 직후 1시간
  const url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';  /* URL */
  let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ serviceKey;                 /* 공공데이터포털에서 발급받은 인증키 */
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml');    /* 데이터 표출방식 xml */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');      /* 한 페이지 결과 수 */
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(num);          /* 페이지 번호 */

  return url+queryParams;
}

function ToggleBtnComponent({rtLo, rtOn, rtAt, idx}) {
  const [isShown, setIsShown] = useState("hidden");

  const handleClick = (e) => {
    isShown === "visible" ? setIsShown("hidden") : setIsShown("visible");
  }

  return (
    <div className="tooltip inline-block align-bottom">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={(e)=> handleClick(e)} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <div className={"tooltip-area right-10 md:right-auto " } style={{"visibility": isShown}}><KakaoMap map={rtLo} mOn={rtOn} mAt={rtAt}></KakaoMap></div>
    </div>
  );
}

function setupDateform( str ) {
  const yyyy = str.toString().substring(0,4);
  const mm = str.toString().substring(4,6);
  const dd = str.toString().substring(6,8);
  const hh = str.toString().substring(8,10);
  const ii = str.toString().substring(10,12);
  return yyyy+'-'+mm+"-"+dd+' '+hh+':'+ii;
}


function areaChange( str ) {
  let rtObj = new Object();
  let rtLo, rtOn, rtAt = "";
  switch(str) {
    case 'GURO_F01':
      rtLo = "서울특별시 구로구 신도림동 271-64";
      rtOn  = "126.8800271";
      rtAt  = "37.51515653";
    break;
    case 'GURO_F02':
      rtLo = "서울특별시 구로구 구로동 3-33";
      rtOn  = "126.8931058";
      rtAt  = "37.50722186";
    break;
    case 'GURO_F03':
      rtLo = "서울특별시 구로구 구로동(거리공원오거리)";
      rtOn  = "126.8933215";
      rtAt  = "37.49753346";
    break;
    case 'GURO_F04':
      rtLo = "서울특별시 구로구 구로동 1124-7";
      rtOn  = "126.8998716";
      rtAt  = "37.48437752";
    break;
    case 'GURO_F05':
      rtLo = "서울특별시 구로구 구로동 636-46";
      rtOn  = "126.8710552";
      rtAt  = "37.49980341";
    break;
    case 'GURO_F06':
      rtLo = "서울특별시 구로구 개봉동 195-7";
      rtOn  = "126.8635068";
      rtAt  = "37.49149133";
    break;
    case 'GURO_F07':
      rtLo = "서울특별시 구로구 개봉동 산53-3";
      rtOn  = "126.8466008";
      rtAt  = "37.48542832";
    break;
    case 'GURO_F08':
      rtLo = "서울 구로구 항동 222-16";
      rtOn  = "126.8285707";
      rtAt  = "37.48560468";
    break;
    case 'GURO_F09':
      rtLo = "서울특별시 구로구 궁동 44";
      rtOn  = "126.8294834";
      rtAt  = "37.50116262";
    break;
    case 'GURO_F10':
      rtLo = "서울특별시 구로구 고척동 산9-14";
      rtOn  = "126.8533211";
      rtAt  = "37.50656293";
    break;
  }
  rtObj["rtLo"] = rtLo;
  rtObj["rtOn"] = rtOn;
  rtObj["rtAt"] = rtAt;
  return rtObj;
}

function IconChange(code) {
  let rtImg = "";
  switch(code) {

    case 0:
      rtImg = "";
      break;
    case 1:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg></div>';

      break;
    case 2:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" /></svg></div>';

      break;
    case 3:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg></div>';

      break;
    case 4:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25" /></svg></div>';

      break;
    case 5:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg></div>';

      break;
    case 6:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg></div>';

      break;
    case 7:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></div>';

      break;
    case 8:
      rtImg = '풍향 : <div style="width:24px; height:24px; display: inline-block; vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" /></svg></div>';

      break;
  }

  return rtImg;
}