import "./App.css";
import LogInPage from "./page/logInPage";
import RefrigeratorPage from "./page/refrigeratorPage";
import Nav from "./page/nav";
import Footer from "./page/footer";
import MainPage from "./page/mainPage";
import AlarmPage from "./page/alarmPage";
import MyPage from "./page/myPage";
import { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { dummy } from "./dummy/dummy";
import axios from "axios";
require("dotenv").config();


function App({ history }) {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userinfo, setUserinfo] = useState(null);
  const [product, setProduct] = useState([
    {
      id: "",
      storage: "",
      category_name: "",
      day_ago: "",
      food_expiration: "",
      food_name: "",
      food_quantity: "",
    },
  ]);

  const [accessToken, setAccessToken] = useState(null);
  // const history = useHistory();

  const isAuthenticated = (accessToken) => {
    // console.log(token)
    setAccessToken(accessToken);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/mypage/mypageInfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if(res) {
        // console.log(res.data.data.userInfo)
        setUserinfo(res.data.data.userInfo);
        setNickname(res.data.data.userInfo.nickname);
        setIsLogin(true);
        }
      })
      .catch((err) => {
        setIsLogin(false);
      });
  };

  const handleResponseSuccess = (data) => {
    isAuthenticated(data);
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/signout`)
      .then((res) => {
          setUserinfo(null);
          setIsLogin(false);
      })
  };

  //새로고침해도 로그인 유지--------------------
  useEffect(() => {
    accessTokenRequest();
  }, [])

  //구글 로그인 코드---------------------------
  //서버의 /callback 엔드포인트로 authorization code를 보내주고
  //access token을 받아옵니다.
  const googleAccessToken = async (authorizationCode) => {
    let resp = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/callback/google`,
        { authorizationCode },
        { withCredentials: true }
      )
    issueAccessToken(resp.data.accessToken);
    setIsLogin(true);
  };

  //카카오 로그인 코드---------------------------------- 구글 로그인 확인 후 진행
  // const getAccessToken = async (authorizationCode) => {
  //   let resp = await axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/callback/kakao`,
  //       { authorizationCode },
  //       { withCredentials: true }
  //     );
  //   issueAccessToken(resp.data.accessToken);
  //   setIsLogin(true);
  // };

  //소셜 로그인 코드 받기--------------------------------
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      googleAccessToken(authorizationCode);
    }
  });
  return (
    <>
      <BrowserRouter>
        <Nav isLogin={isLogin} handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/RefrigeratorPage">
            <RefrigeratorPage
              product={product}
              setProduct={setProduct}
              isLogin={isLogin}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/AlarmPage">
            <AlarmPage
              // alram={alram}
              // setAlram={setAlram}
              product={product}
              setProduct={setProduct}
              isLogin={isLogin}
              // accessToken={accessToken}
            />
          </Route>
          <Route path="/MyPage">
            <MyPage
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              userInfo={userinfo}
              accessToken={accessToken}
              handleLogout={handleLogout}
              userinfo={userinfo}
              nickname={nickname}
              setNickname={setNickname}
            />
          </Route>
          <Route path="/LogInPage">
            {isLogin ? (
              <MainPage />
            ) : (
              <LogInPage
                handleResponseSuccess={handleResponseSuccess}
                // loginHandler={loginHandler}
                setAccessToken={setAccessToken}
                isLogin={isLogin}
              />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
