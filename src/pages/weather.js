import Layout from '../components/Layout';
import React, { useEffect } from 'react';
import * as config from './config/env.js';
import KakaoMap from './kakao_map.js';


const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {

  const serviceKey = config.JSW_DATA_KEY;

  // 구로구 주요 포인트 날씨 예보 조회 서비스 
  // https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15095628

  // 55페이지 기준 바로 직후 1시간
  const url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';  /* URL */
  let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ serviceKey;                 /* 공공데이터포털에서 발급받은 인증키 */
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml');    /* 데이터 표출방식 xml */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');      /* 한 페이지 결과 수 */
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('15');          /* 페이지 번호 */

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
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

}


export default function weather(rsv) {

  useEffect( ()=> {
    console.log('useEffect 호출');
    //console.log(rsv);
    return () => {
      console.log('useEffect unmount 호출');
    }

  }, [])

  const returnKey = Object.keys(rsv['xmlReturnValue']);
  const returnValue = Object.values(rsv['xmlReturnValue']);
  let returnMsg , v2 = "test";
  let listA = new Array();
  let listHeader = new Array();

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

      const areaTitle = areaChange(item.localCode);
      const listarr =`<div class="md:flex box-shaping shadow-md rounded-xl auto-cols-auto grid grid-cols-4 gap-4 mb-8">
<div class="col-span-4">지역 : ${areaTitle.rtLo} <div style="display:inline-table; vertical-align:sub;"><svg  fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" id="caution-sign-circle" xmlns="http://www.w3.org/2000/svg" class="icon line"><line id="primary-upstroke" x1="11.95" y1="16.5" x2="12.05" y2="16.5" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.95;"></line><path id="primary" d="M3,12a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0a9,9,0,0,1-9,9h0a9,9,0,0,1-9-9Zm9,0V7" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></svg></div> </div>
<div>날씨코드 : ${item.iconNo}</div>
<div>기온 : ${item.temp}</div>
<div>습도 : ${item.humi}</div>
<div>강수확률 : ${item.rainProb}</div>
<div>강수량 : ${item.rain}</div>
<div>풍향코드 : ${item.windDir}</div>
<div>풍속 : ${item.windSpeed}</div>
</div>`;
      listA.push(listarr);

      
      if(index == 0) {
        listHeader.push(item.baseDate);
        listHeader.push(item.fcsDate);
      }
    })

    v2 = 'dark';

    returnMsg = listA.join(''); 
    returnMsg = listA.join(''); 


    console.log('함수 끝 호출');

  }

  return (
    <>
      <Layout>
      </Layout>
      <div style={{width: "100%", margin: "auto", textAlign: "center"}}>

        {/* <div>발표일 : <Date dateString={listHeader[0]} /></div> */}
        <div className="">발표일 : {setupDateform(listHeader[0])}</div>
        <div>예보일 : {setupDateform(listHeader[1])}</div>

        <div dangerouslySetInnerHTML={{__html:returnMsg}} className={`max-w-xl mx-auto bg-white overflow-x-auto overflow-y-hidden md:flex-col md:max-w-6xl  ${v2}`} style={{textAlign: "center", margin: "auto"}}></div>
        <br/>
        <div className="box-shaping">test</div>


        <KakaoMap style={{width:"1000px", height:"400px"}}></KakaoMap>

      </div>
    </>

  )
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