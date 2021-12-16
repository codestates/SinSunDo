import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import MainPage from './components/mainPage';
import MyPage from './components/myPage';
import MyPageCorrection from './components/myPageCorrection';
import AlarmPage from './components/alarmPage';

function App() {
  return (
    <>
      <Nav />
      {/* <MainPage /> */}
      {/* <MyPage /> */}
      {/* <MyPageCorrection /> */}
      <AlarmPage />
      <Footer />
    </>
  );
}

export default App;
