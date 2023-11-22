<script setup>
import {ref, watch, onMounted} from "vue";
import {markerImg} from "@/assets/js/marker.js"

var map;
const positions = ref([]);
const markers = ref([]);
const props = defineProps({
  attraction: {
    type: Object
  }
})

watch(
    () => props.attraction,
    (pos) => {
      console.log("받음", pos.latitude, pos.longitude);

      var moveLatLon = new kakao.maps.LatLng(pos.latitude, pos.longitude);

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);

      var imageSrc = markerImg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      var marker = new kakao.maps.Marker({
        position: moveLatLon, // 마커를 표시할 위치
        title: pos.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
        clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        image: markerImage // 마커이미지 설정
      });

      marker.setMap(map);
      map.setLevel(pos.mlevel);

      var iwContent =
          `<div style="padding:5px;"> ${pos.title} <br><a href="https://map.kakao.com/link/map/${pos.title},${pos.latitude},${pos.longitude}" style="color:blue" target="_blank">큰지도보기</a> `// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
// 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent
      });

// 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
      });

      console.log("마커", marker)
      console.log("마커 생성하기")
      positions.value.push(moveLatLon);
    }
)

watch(
    () => positions.value,
    (pos) => {
      console.log("position에 ", pos);


      // 지도에 표시할 선을 생성합니다
      var polyline = new kakao.maps.Polyline({
        path: positions.value, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#FFAE00', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      });

      // 지도에 선을 표시합니다
      polyline.setMap(map);

      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds = new kakao.maps.LatLngBounds();

      var i;
      for (i = 0; i < positions.value.length; i++) {
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(positions.value[i]);
      }

      map.setBounds(bounds);


    },
    {
      deep: true
    }
)

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
        import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 6,
  };
  map = new kakao.maps.Map(container, options);

  var zoomControl = new kakao.maps.ZoomControl();

// 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);
  // 키보드로 지도를 조작할 수 없도록 설정한다
  map.setKeyboardShortcuts(true);


  // loadMarkers();
};

// const loadMarkers = () => {
//   // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
//   deleteMarkers();
//
//   // 마커 이미지를 생성합니다
//   //   const imgSrc = require("@/assets/map/markerStar.png");
//   // 마커 이미지의 이미지 크기 입니다
//   //   const imgSize = new kakao.maps.Size(24, 35);
//   //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
//
//   // 마커를 생성합니다
//   markers.value = [];
//   positions.value.forEach((position) => {
//     const marker = new kakao.maps.Marker({
//       map: map, // 마커를 표시할 지도
//       position: position.latlng, // 마커를 표시할 위치
//       title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
//       clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
//       // image: markerImage, // 마커의 이미지
//     });
//     markers.value.push(marker);
//   });
//
//   // 4. 지도를 이동시켜주기
//   // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
//   const bounds = positions.value.reduce(
//       (bounds, position) => bounds.extend(position.latlng),
//       new kakao.maps.LatLngBounds()
//   );
//
//   map.setBounds(bounds);
// };
//
// const deleteMarkers = () => {
//   if (markers.value.length > 0) {
//     markers.value.forEach((marker) => marker.setMap(null));
//   }
// };
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 700px;
}
</style>
