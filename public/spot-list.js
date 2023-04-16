function fetchSpotsAndUpdateList() {
    fetch("/spots")
      .then((response) => response.json())
      .then((spots) => {
        const spotList = document.querySelector("ul.spot-list");
        spotList.innerHTML = "";
  
        spots.forEach((spot) => {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.href = `spot-detail.html?id=${spot.id}`;
          link.textContent = spot.name;
          listItem.appendChild(link);
          spotList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching spots:", error);
      });
  }
  
  if (document.querySelector("body.spot-list")) {
    // 스팟 목록 페이지가 로드될 때 서버에서 스팟 목록을 가져옵니다.
    fetchSpotsAndUpdateList();
    
    // 페이지가 새로 고침될 때 스팟 목록을 업데이트합니다.
    window.addEventListener("focus", fetchSpotsAndUpdateList);
  }