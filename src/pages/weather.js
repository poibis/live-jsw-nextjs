import Layout from '../components/Layout';
import React, { useEffect } from 'react';

const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {

  const serviceKey = "5UU%2BJ7Gl%2F3y9okV12JdtmDbSb2fe3rrEa4ekqjFN9vJVnXznk7biGK4MHZOSs0i9SPtd7%2Fnb5wF2iYy8J7jiRQ%3D%3D";

  // 구로구 주요 포인트 날씨 예보 조회 서비스 
  // https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15095628

  const url = 'http://apis.data.go.kr/3160000/guroPointFocInfoSvc/getGuro10PointFocInfoSvc';  /* URL */
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
    console.log('123');
    console.log(rsv);
    console.log('456');

  }, [])

  const returnKey = Object.keys(rsv['xmlReturnValue']);
  const returnValue = Object.values(rsv['xmlReturnValue']);
  let returnMsg, v2 = "test";
  let listA = new Array();

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
      const listarr =`<div>
<div>${index}</div>
<div>지역 코드 : ${item.localCode}</div>
<div>발표일시 : ${item.baseDate}</div>
<div>예보일시 : ${item.fcsDate}</div>
<div>날씨코드 : ${item.iconNo}</div>
<div>기온 : ${item.temp}</div>
<div>습도 : ${item.humi}</div>
<div>강수확률 : ${item.rainProb}</div>
<div>강수량 : ${item.rain}</div>
<div>풍향코드 : ${item.windDir}</div>
<div>풍속 : ${item.windSpeed}</div>
</div>`;
      listA.push(listarr);
    })
    v2 = 'black';

    console.log(listA);
    returnMsg = listA.join(''); 
  }

  return (
    <>
      <Layout>
      </Layout>
      <div style={{width: "1200px", margin: "auto", textAlign: "center"}}>
        <div dangerouslySetInnerHTML={{__html:returnMsg}} className={`box-shaping ${v2}`} style={{textAlign: "center", margin: "auto"}}></div>
        <br/>
        <div className="box-shaping">test</div>

      </div>
    </>

  )
}
