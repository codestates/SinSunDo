require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");

const schedule = require('node-schedule'); // 스케줄러 : 설정 시간마다 실행되는 패키지
const { alram, foodData, mail } = require('./controllers/schedule/updateData');

const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

// const controllers = require("./controllers");
const usersRoute = require('./route/users');
const productRoute = require('./route/product');


app.use(express.json()); //front에서 json 형식의 데이터를 보냈을 때 데이터 req.body에 넣어준다
app.use(express.urlencoded({ extended: false })); // form submit 했을 때 데이터를 req.body에 넣어준다
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "PATCH", "POST", "DELETE"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello SinSunDo!");
});

app.use('/users', usersRoute);
app.use('/product', productRoute);

// 매 0시 5분 0초에 업데이트를 진행
const update_dayAgo = schedule.scheduleJob(
  '00 05 0 * *',
  async () => {
    alram();
    foodData();
    mail();
  },
);




const HTTPS_PORT = process.env.HTTPS_PORT || 80;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다. 
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server runnning"));

} else {
  server = app.listen(HTTPS_PORT, () => {
      console.log("http server runnning")
  })
}
module.exports = server;