document.addEventListener("DOMContentLoaded", () => {
  // 로그인 폼 제출 이벤트 처리
  const loginForm = document.querySelector(".login-form");
  loginForm.addEventListener("submit", handleLoginFormSubmit);

  // 로그아웃 버튼 클릭 이벤트 처리
  const logoutButton = document.querySelector(".logout-button");
  logoutButton.addEventListener("click", handleLogoutButtonClick);

  // 현재 로그인 상태 확인
  checkLoginStatus();
  fetchPopularSpots();
});

function handleLoginFormSubmit(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  fetch("users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.status === 200) {
        checkLoginStatus();
      } else {
        alert("로그인 실패!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// 로그인 상태 확인 함수
function checkLoginStatus() {
  fetch("/users/current-user")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Not logged in");
      }
    })
    .then((user) => {
      // 로그인 상태이면 로그인 폼과 회원가입 버튼을 숨기고 닉네임과 로그아웃 버튼을 표시
      document.querySelector(".login-form").style.display = "none";
      document.querySelector(".signup-button").style.display = "none";
      document.querySelector(".logout-button").style.display = "block";
      const nicknameElement = document.createElement("span");
      nicknameElement.id = "user-nickname";
      nicknameElement.textContent = user.nickname + '님 어서오세요';
      const loginContainer = document.querySelector(".login-container");
      loginContainer.insertBefore(nicknameElement, document.querySelector(".logout-button"));
    })
    .catch((error) => {
      // 로그아웃 상태이면 로그인 폼과 회원가입 버튼을 표시하고 닉네임과 로그아웃 버튼을 숨김
      document.querySelector(".login-form").style.display = "block";
      document.querySelector(".signup-button").style.display = "block";
      document.querySelector(".logout-button").style.display = "none";
      const nicknameElement = document.getElementById("user-nickname");
      if (nicknameElement) {
        nicknameElement.remove();
      }
    });
}

// 로그아웃 버튼 클릭 이벤트 처리 함수
function handleLogoutButtonClick() {
  fetch("users/logout", {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        checkLoginStatus();
      } else {
        alert("로그아웃 실패!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//인기 서핑 스팟 가져오는 함수
function fetchPopularSpots() {
  fetch("/spots/popular/5")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching popular spots");
      }
    })
    .then((spots) => {
      displayPopularSpots(spots);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//인기 서핑스팟 표시하는 함수
function displayPopularSpots(spots) {
  const spotList = document.getElementById("spot-list");
  spotList.innerHTML = ""; // 기존 목록을 비웁니다.

  spots.forEach((spot) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `spot-detail.html?id=${spot.id}`; // 스팟 디테일 페이지로 이동하는 링크를 설정합니다.
    a.textContent = `${spot.name}`;
    li.appendChild(a);
    spotList.appendChild(li);
  });
}
