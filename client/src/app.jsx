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
require('dotenv').config();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null)

  const isAuthenticated = (accessToken) => {
    // console.log(token)
    setAccessToken(accessToken)
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/mypage/mypageInfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if(res) {
        // console.log(res.data.data.userInfo)
          setUserinfo(res.data.data.userInfo);
          setIsLogin(true);
        }
      })
      .catch((err) => {
        setIsLogin(false);
    });
  };
  const handleResponseSuccess = (data) => {
    isAuthenticated(data.data.data.accessToken.split(" ")[1]);
  };

  const handleLogout = ({ history }) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signout`)
      .then((res) => {
        setUserinfo(null);
        setIsLogin(false);
        history.push('/');
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav
          isLogin={isLogin}
          // logoutHadler={logoutHadler}
          handleLogout={handleLogout}
        />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/RefrigeratorPage">
            <RefrigeratorPage
              // product={product}
              // setProduct={setProduct}
              isLogin={isLogin}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/AlarmPage">
            <AlarmPage
              // alram={alram}
              // setAlram={setAlram}
              // product={product}
              // setProduct={setProduct}
              isLogin={isLogin}
            // accessToken={accessToken}
            />
          </Route>
          <Route path="/MyPage">
            <MyPage
              isLogin={isLogin}
              userInfo={userinfo}
              accessToken={accessToken}
              handleLogout={handleLogout}
              userinfo={userinfo}
            />
          </Route>
          <Route path="/LogInPage">
            <LogInPage
              handleResponseSuccess={handleResponseSuccess}
              // loginHandler={loginHandler}
              // googleAccessToken={googleAccessToken}
              isLogin={isLogin}
            />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;