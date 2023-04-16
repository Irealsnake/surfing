document.getElementById("spot-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const spotName = document.getElementById("spot-name").value;
    const spotDescription = document.getElementById("spot-description").value;
  
    // 서버에 스팟 정보 전송
    fetch("/spots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: spotName,
        description: spotDescription,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          // 스팟이 성공적으로 추가되면 스팟 목록 페이지로 이동
          window.location.href = "/spot-list.html";
        } else {
          throw new Error("Error creating spot");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("스팟 추가에 실패했습니다. 다시 시도해 주세요.");
      });
  });
  