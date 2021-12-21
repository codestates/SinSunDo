import "./App.css";
import LogInPage from "./page/logInPage";
import MembershipPage from "./page/membershipPage";
import ProductUpload from "./page/productUpload";
import RefrigeratorPage from "./page/refrigeratorPage";
import Nav from "./page/nav";
import Footer from "./page/footer";
import MainPage from "./page/mainPage";
import AlarmPage from "./page/alarmPage";
import MyPage from "./page/myPage";
import { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ConsoleWriter } from "istanbul-lib-report";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState({ accessToken: null })
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    img: ''
  });

  //로그인 관리----------------------------------------
  const loginHandler = () => {
    setIsLogin(true);
    issueAccessToken(data.accessToken);
    // issueAccessToken(data.data.accessToken);
  }

  useEffect(() => {
    if (accessToken.accessToken === null) {
      logoutHadler();
    }
  }, [])

  //로그아웃 관리-------------------------------------------------------
  const logoutHadler = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/signout`,
        { withCredentials: true })
      .then((res) => {
        setIsLogin(false);
        setAccessToken({ accessToken: null });
        setUserInfo({
          email: '',
          nickname: '',
          img: ''
        })
        history.push('/');
      });
  };

  //토큰 요청--------------------------------------------------------------
  const accessTokenRequest = (accessToken) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/tokenData/accessToken`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      .then((res) => {
        const { email, nickname, img } = res.data.userInfo
        setUserInfo({ email, nickname, img })
      })
      .catch((err) =>
        console.log(err)
      );
  }

  //토큰 최신화------------------------------------
  const issueAccessToken = (token) => {
    setAccessToken({ accessToken: token });
    accessTokenRequest(token);
  }

  //새로고침해도 로그인 유지--------------------
  useEffect(() => {
    accessTokenRequest();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Nav
          isLogin={isLogin}
          logoutHadler={logoutHadler}
        />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/RefrigeratorPage">
            <RefrigeratorPage
              isLogin={isLogin}
              userInfo={userInfo}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/AlarmPage">
            <AlarmPage
              isLogin={isLogin}
              userInfo={userInfo}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/MyPage">
            <MyPage
              isLogin={isLogin}
              userInfo={userInfo}
              accessToken={accessToken}
              logoutHadler={logoutHadler}
            />
          </Route>
          <Route path="/LogInPage">
            <LogInPage
              loginHandler={loginHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
