<script setup>
import {onMounted, ref, watch} from "vue";
import {markerImg} from "@/assets/js/marker.js"

var map;
const positions = ref([]);
const markers = ref([]);
const polylines = ref([]);
const positionsForRead = ref([]);
const markersForRead = ref([]);
const polylinesForRead = ref([]);

const props = defineProps({
  attraction: {
    type: Object
  },
  attractionForRead: {
    type: Object
  },
  remove: {
    type: Object
  },
  pos: {
    type: Array
  },
})

watch(() => props.attractionForRead,
    (value) => {
      positionsForRead.value = value.attractions.map(attraction => {
        return {
          latitude: attraction.latitude,
          longitude: attraction.longitude
        };
      });
      console.log("상세 읽기용 attraction: ", value, value.attractions, positionsForRead.value);
    }
);

watch(() => positionsForRead,
    (value) => {
      console.log("지도 positions",);
    }
);

const removeMarkersForRead = () => {
  markers.value.forEach(marker => {
    marker.setMap(null); // 지도에서 마커 제거
  });
  markers.value = []; // 배열 초기화
};

const removePolylineForRead = () => {
  polylines.value.forEach(polyline => {
    polyline.setMap(null); // 지도에서 마커 제거

  });
  polylines.value = []; // 배열 초기화
};

// Watcher를 사용하여 newPositions 값이 변경될 때마다 마커를 업데이트
watch(() => positionsForRead,
    (newVal) => {
      removeMarkersForRead(); // 기존 마커들 제거
      removePolylineForRead();

      console.log(newVal.value);
      positions.value = [];

      var imageSrc = markerImg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      var decimal = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      var rgb = decimal.replace(/[^%,.\d]/g, "").split(",");

      rgb.forEach(function (str, x, arr) {

        /* 컬러값이 "%"일 경우, 변환하기. */
        if (str.indexOf("%") > -1) str = Math.round(parseFloat(str) * 2.55);

        /* 16진수 문자로 변환하기. */
        str = parseInt(str, 10).toString(16);
        if (str.length === 1) str = "0" + str;

        arr[x] = str;
      });

      const color = "#" + rgb.join("");

      // 새로운 마커를 찍기 위해 배열을 순회하면서 마커 생성 및 설정
      newVal.value.forEach(position => {
        var moveLatLon = new kakao.maps.LatLng(position.latitude, position.longitude);

        const marker = new kakao.maps.Marker({
          id: position.attraction_id,
          position: new kakao.maps.LatLng(position.latitude, position.longitude), // 좌표값 설정
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
          clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          image: markerImage // 마커이미지 설정
        });

        marker.setMap(map);
        markers.value.push(marker); // 생성된 마커 객체를 배열에 저장
        positions.value.push(moveLatLon);

        // 지도에 표시할 선을 생성합니다
        var polyline = new kakao.maps.Polyline({
          path: positions.value, // 선을 구성하는 좌표배열 입니다
          strokeWeight: 5, // 선의 두께 입니다
          strokeColor: `${color}`, // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        });

        // 지도에 선을 표시합니다
        polyline.setMap(map);
        polylines.value.push(polyline);
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds();

        var i;
        for (i = 0; i < positions.value.length; i++) {
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(positions.value[i]);
        }

        map.setBounds(bounds);
      })

    }, {
      deep: true
    });

// 기존 마커들을 모두 제거하는 함수
const removeMarkers = () => {
  markers.value.forEach(marker => {
    marker.setMap(null); // 지도에서 마커 제거
  });
  markers.value = []; // 배열 초기화
};

const removePolyline = () => {
  polylines.value.forEach(polyline => {
    polyline.setMap(null); // 지도에서 마커 제거

  });
  polylines.value = []; // 배열 초기화
};


// Watcher를 사용하여 newPositions 값이 변경될 때마다 마커를 업데이트
watch(() => props.pos,
    (newVal) => {
      removeMarkers(); // 기존 마커들 제거
      removePolyline();
      positions.value = [];

      var imageSrc = markerImg, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      // 새로운 마커를 찍기 위해 배열을 순회하면서 마커 생성 및 설정
      newVal.forEach(position => {
        var moveLatLon = new kakao.maps.LatLng(position.latitude, position.longitude);

        const marker = new kakao.maps.Marker({
          id: position.attraction_id,
          position: moveLatLon, // 좌표값 설정
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
          clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          image: markerImage // 마커이미지 설정
        });

        marker.setMap(map);
        markers.value.push(marker); // 생성된 마커 객체를 배열에 저장
        positions.value.push(moveLatLon);

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
        polylines.value.push(polyline);
        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds();

        var i;
        for (i = 0; i < positions.value.length; i++) {
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(positions.value[i]);
        }

        map.setBounds(bounds);
      })

    }, {
      deep: true
    });

//관광지 삭제시 마커, 폴리라인 삭제
watch(
    () => props.remove,
    (newVal) => {
      const marker = {markers};
      console.log(marker, markers.value[newVal.index].id, markers.value);
      markers.value[newVal.index].setMap(null);
      polylines.value[newVal.index].setMap(null);

      markers.value.splice(newVal?.index, 1);
      polylines.value.splice(newVal?.index, 1);
      positions.value.splice(newVal?.index, 1);
    },
    {
      deep: true
    });

//관광지 추가시 마커 그리기
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
        id: props.attraction.id,
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
      markers.value.push(marker);
    }
)

//관광지 추가시 폴리라인 그리기
watch(
    () => positions.value,
    (pos) => {
      console.log("position에 ", pos);

      if (pos.length === 0) {
        return
      }
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
      polylines.value.push(polyline);
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
};
</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: auto;
  margin-left: 20px;
}
</style>
