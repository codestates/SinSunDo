import "./App.css";
import LogInPage from "./page/logInPage";
import MembershipPage from "./page/membershipPage";
import ProductUpload from "./page/productUpload";
import RefrigeratorPage from "./page/refrigeratorPage";
import Nav from './page/nav'
import Footer from './page/footer'
import MainPage from './page/mainPage'
import AlarmPage from "./page/alarmPage";
import MyPage from './page/myPage';
import MyPageCorrection from './page/myPageCorrection'

function App() {
  return <>
    <Nav />
    {/* <MainPage /> */}
    {/* <AlarmPage /> */}
    {/* <MyPage /> */}
    {/* <MyPageCorrection /> */}
    <RefrigeratorPage />
    <Footer />
  </>;
}

export default App;
