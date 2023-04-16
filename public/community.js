document.addEventListener("DOMContentLoaded", () => {
    fetchPosts();
  
    // 작성하기 버튼 클릭 이벤트 처리
    document
      .getElementById("create-post-button")
      .addEventListener("click", () => {
        window.location.href = "postform.html";
      });
  });
  
  function fetchPosts() {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => displayPosts(data))
      .catch((err) => console.error(err));
  }
  
  function displayPosts(posts) {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
  
    posts.forEach((post) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `postdetail.html?id=${post.id}`;
      a.textContent = post.title;
      li.appendChild(a);
      postList.appendChild(li);
    });
  }
  