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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [accessToken, setAccessToken] = useState('')

  const isAuthenticated = (token) => {
    console.log(token);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/mypage`, {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setAccessToken(token);
        setUserinfo(res.data.data.userInfo);
        setIsLogin(true);
      })
  };

  const handleResponseSuccess = (data) => {
    isAuthenticated(data);
  };

  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signout`)
      .then((res) => {
        setUserinfo(null);
        setIsLogin(false);
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
            // accessToken={accessToken}
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
              setAccessToken={setAccessToken}
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