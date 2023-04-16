async function fetchSpotDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const spotId = urlParams.get("id");

  if (spotId) {
    try {
      const response = await fetch(`/spots/${spotId}`);
      if (response.ok) {
        const spot = await response.json();
        document.getElementById("spot-name").innerText = spot.name;
        document.getElementById("spot-description").innerText = spot.description;

        // 지도 초기화 코드를 추가합니다.
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: spot.name }, (results, status) => {
          if (status === "OK") {
            const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 15,
              center: results[0].geometry.location,
            });

            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              title: spot.name,
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });

      } else {
        alert("Failed to fetch spot details");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching spot details");
    }
  } else {
    alert("No spot ID provided");
  }
}

$(document).ready(function initCalendar() {
  $("#calendar").fullCalendar({
    locale: "ko",
    header: {
      left: "",
      center: "title",
      right: "",
    },
    defaultView: "basicWeek",
    columnHeaderFormat: "ddd M/D",
    events: [
      {
        title: "강습 3",
        start: moment().add(1, "days"),
      },
      {
        title: "영상 촬영 2",
        start: moment().add(2, "days"),
      },
      {
        title: "카풀 1",
        start: moment().add(3, "days"),
      },
    ],
  });
});


fetchSpotDetails();

