document.getElementById("post-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;
    const spot_id = document.getElementById("spot_id").value;
  
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category: category,
        spot_id: spot_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error creating post");
        }
      })
      .then((data) => {
        console.log("Post created:", data);
        window.location.href = "community.html"; // 게시물 목록으로 이동
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  window.addEventListener("load", () => {
    fetch("/spots")
      .then((response) => response.json())
      .then((spots) => {
        const spotSelect = document.getElementById("spot_id");
        spots.forEach((spot) => {
          const option = document.createElement("option");
          option.value = spot.id;
          option.textContent = spot.name;
          spotSelect.appendChild(option);
        });
      });
  });
  