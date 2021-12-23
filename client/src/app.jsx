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

function App({ history }) {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState({ accessToken: null })
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    img: ''
  });
  const [product, setProduct] = useState(dummy.product);
  const [alram, setAlram] = useState(dummy.alram);

  //로그인 관리----------------------------------------
  const loginHandler = (data) => {
    setIsLogin(true);
    issueAccessToken(data.data.accessToken);
  }

  // useEffect(() => {
  //   if (accessToken.accessToken === null) {
  //     logoutHadler();
  //   }
  // }, [])

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
          user_picture: ''
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
        const { email, nickname, user_picture } = res.data.userInfo
        setUserInfo({ email, nickname, user_picture })
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
              product={product}
              setProduct={setProduct}
              isLogin={isLogin}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/AlarmPage">
            <AlarmPage
              alram={alram}
              setAlram={setAlram}
              product={product}
              setProduct={setProduct}
              isLogin={isLogin}
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
              googleAccessToken={googleAccessToken}
            />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
