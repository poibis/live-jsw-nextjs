import React, { useEffect } from 'react';
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

async function translateArea( location_code ) {
  const serviceKey = "5UU%2BJ7Gl%2F3y9okV12JdtmDbSb2fe3rrEa4ekqjFN9vJVnXznk7biGK4MHZOSs0i9SPtd7%2Fnb5wF2iYy8J7jiRQ%3D%3D";

  // 구로구 주요 포인트 날씨 예보 조회 서비스 
  // https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15095628

  const url = 'http://apis.data.go.kr/3160000/guroPointFocLocInfoSvc';  /* URL */
  let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ serviceKey;                 /* 공공데이터포털에서 발급받은 인증키 */
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('xml');    /* 데이터 표출방식 xml */
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');      /* 한 페이지 결과 수 */
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');          /* 페이지 번호 */

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
  
  console.log(xmlContent);
}

export default function areaChange( req, res ) {
  console.log(req);
  res.status(200).json({ req: 'ttt' , test: 'test'});
  let rtImg = "";
  //translateArea(str);
  switch(str) {
    case 'GURO_F01':
      
    break;
    case 'GURO_F02':
    
    break;
    case 'GURO_F03':
    
    break;
    case 'GURO_F04':
    
    break;
    case 'GURO_F05':
    
    break;
    case 'GURO_F06':
    
    break;
    case 'GURO_F07':
    
    break;
    case 'GURO_F08':
    
    break;
    case 'GURO_F09':

    break;
    case 'GURO_F10':
      
    break;

  }
}