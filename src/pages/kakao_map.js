import {useEffect, useState} from 'react';
import * as config from './config/env.js';

export default function kakao_map() {
  /* const [test, setTest] = useState(); */
  const mapUri = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${config.JSW_KAKAO_KEY}&autoload=false`;

  useEffect(() => {
    /* const { location } = document;
    setTest(location); */

    kakao.maps.load( () => {
      // map 영역
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };
      
      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // map 영역

    });

    console.log('완료');
  }, []);

  return (
    <>
      <script type="text/javascript" defer src={mapUri} />
      <div id="map" style={{width:"500px", height:"400px"}}></div>

    </>
  )
}