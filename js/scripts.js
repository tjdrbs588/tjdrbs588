var map = null;
var marker_count = 0;
var marker_content = '<div class="marker_popup">';
    marker_content += '<h4>상세정보를 입력하세요.</h4>';
    marker_content += '<p>남구 주안2동 미주홀대로 645번길</p>';
    marker_content += '<div>';
        marker_content += '<button class="btn btn-secondary" onclick="go_info()">상세정보 입력</button>';
        marker_content += '<button class="btn btn-secondary">삭제</button>';
    marker_content += '</div>';
marker_content += '</div>';

function go_info() {
    // console.log(url);
    location.href = "/views/add_info.html";
}

function initMap () {
    var promises = new Promise(function(resolve) {
        var X_point			= 128.558612;		// X 좌표
        var Y_point			= 35.837143;		// Y 좌표

        map = new google.maps.Map(document.getElementById("map_ma"), {
            center: {lat: 35.837143, lng: 128.558612},
            zoom: 16
        });

        resolve();
    })

    return promises;
}

function make_marker (location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    marker.addListener('click', function () {
        var infoWindow = new google.maps.InfoWindow({
            content: marker_content
        });

        infoWindow.open(map, marker);
    })

    marker_count++;
}

$(function() {
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    $("#map_ma").css({
        width: winWidth,
        height: winHeight
    });

    initMap().then(function() {
        google.maps.event.addListener(map,'click',function(event) {
            make_marker(event.latLng);

            var x = event.latLng.lat();
            var y = event.latLng.lng();
        });
    });

    // $("#search_position").on("click", function() {
    //     console.log("dfdfdfdfdf")
    //     $("#search_popup").css("display", "block");
    // })
})