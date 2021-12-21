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
import MyPageCorrection from "./page/myPageCorrection";
import { useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { dummy } from "./dummy/dummy";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [product, setProduct] = useState(dummy.product);
  const [alram, setAlram] = useState(dummy.alram);

  return (
    <>
      <BrowserRouter>
        <Nav isLogin={isLogin} />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/RefrigeratorPage">
            <RefrigeratorPage product={product} setProduct={setProduct} />
          </Route>
          <Route path="/AlarmPage">
            <AlarmPage
              alram={alram}
              setAlram={setAlram}
              product={product}
              setProduct={setProduct}
            />
          </Route>
          <Route path="/MyPage">
            <MyPage />
          </Route>
          <Route path="/LogInPage">
            <LogInPage />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
