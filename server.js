const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const usersRoutes = require("./routes/users");
const spotsRoutes = require("./routes/spots");
const postsRoutes = require("./routes/posts");
const app = express();
const PORT = process.env.PORT || 3000;

// 세션 설정
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPS를 사용하면 secure: true로 설정하세요.
}));

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRoutes);
app.use('/spots', spotsRoutes);
app.use("/posts", postsRoutes);
// 루트 경로로 요청이 들어올 경우 index.html 파일을 응답으로 전송
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 회원가입 페이지 요청 처리
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
