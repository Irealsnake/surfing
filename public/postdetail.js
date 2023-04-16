document.addEventListener("DOMContentLoaded", () => {
    const postId = new URLSearchParams(window.location.search).get("id");
  
    if (postId) {
      fetchPostDetail(postId);
    } else {
      alert("잘못된 게시물 ID입니다.");
      window.location.href = "community.html";
    }
  });
  
  function fetchPostDetail(postId) {
    fetch(`/posts/${postId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("게시물을 찾을 수 없습니다.");
        }
      })
      .then((post) => displayPostDetail(post))
      .catch((err) => {
        alert(err.message);
        window.location.href = "community.html";
      });
  }
  
  function displayPostDetail(post) {
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-author").textContent = `작성자: ${post.author}`;
    document.getElementById("post-content").textContent = post.content;
  }
  