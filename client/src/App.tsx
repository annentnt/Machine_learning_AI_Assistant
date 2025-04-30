import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import AboutUs from './components/home/AboutUs';
import Features from './components/home/Feature';
import Header from './components/home/Header';
import Signin from './pages/signin/signin';
import ForgetPassword from './pages/forget_password/forget_password'
import ResetPassword from './pages/reset_password/reset_password'
import SuccessfulReset from './pages/reset_password/results/successful';
import FailedReset from './pages/reset_password/results/failed';
import ResetVerify from './pages/reset_password/results/verify'; 
import SignUp from './pages/signup/signup/signup';
import SignUpVerify from './pages/signup/verify/verify'
import SignUpVerifySuccessful from './pages/signup/verify/sucessful'
import SignUpVerifyFailed from './pages/signup/verify/fail'
import MainPage from './pages/main/main';
import AutoWrite from './pages/auto_write/auto_write';
import LoggedInHeader from './components/home/Header_Mainpage';
import TranslatePage from './pages/translate/translate';
import RewriteHistory from './pages/rewrite_history/RewriteHistory'
import DetailRewriteHistory from './pages/rewrite_history/DetailHistoryTable'
import TranslationHistory from './pages/translation_history/translation_history'
import DetailTransaltionHistory from './pages/translation_history/DetailHistoryTable'

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn hiện tại thuộc các trang cần LoggedInHeader
  const loggedInHeaderPaths = [
    '/main',
    '/auto-write',
    '/translate',
    '/rewrite-history',
    '/rewrite-history/details',
    '/translation-history',
    '/translation-history/details',
  ];
  const isLoggedInHeader = loggedInHeaderPaths.includes(location.pathname);

  return (
    <div className="bg-hero-gradient min-h-screen">
      {isLoggedInHeader ? <LoggedInHeader /> : <Header />}
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:uidb64/:token/" element={<ResetPassword />} />
        <Route path="/reset-password/successful/:uidb64/:token/" element={<SuccessfulReset />} />
        <Route path="/reset-password/failed" element={<FailedReset />} />
        <Route path="/reset-verification" element={<ResetVerify />} />
        <Route path="/sign-up-verification/" element={<SignUpVerify />} />
        <Route path="/sign-up-verification/successful/:uidb64/:token/" element={<SignUpVerifySuccessful />} />
        <Route path="/sign-up-verification/failed" element={<SignUpVerifyFailed />} />
        <Route path="/auto-write" element={<AutoWrite />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/translate" element={<TranslatePage />} />
        <Route path="/rewrite-history" element={<RewriteHistory />} />
        <Route path="/rewrite-history/details/:id" element={<DetailRewriteHistory />} />
        <Route path="/translation-history" element={<TranslationHistory />} />
        <Route path="/translation-history/details/:id" element={<DetailTransaltionHistory />} />
      </Routes>
    </div>
  );
}

export default App;