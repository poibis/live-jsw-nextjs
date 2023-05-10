import {useEffect, useState} from 'react';

export default function kakao_map( map_param ) {
  /* const [test, setTest] = useState(); */

  const mpm = map_param.map;
  const mpo = Number(map_param.mOn);
  const mpa = Number(map_param.mAt);
  //console.log(mpm);
  useEffect(() => {
    /* const { location } = document;
    setTest(location); */

    kakao.maps.load( () => {
      // map 영역
      const container = document.getElementById(mpm); //지도를 담을 영역의 DOM 레퍼런스
      const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(mpa, mpo), //지도의 중심좌표.
        level: 5 //지도의 레벨(확대, 축소 정도)
      };
      
      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // map 영역

      // 마커가 표시될 위치입니다 
      var markerPosition  = new kakao.maps.LatLng(mpa, mpo); 

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    });

  }, []);

  return (
    <div id={mpm} style={{width:"296px", height:"296px"}}></div>
  )
}