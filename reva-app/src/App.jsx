import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Track from './pages/Track';
import RedirectPage from './pages/RedirectPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/track/:shortCode" element={<Track />} />
          <Route path="/r/:shortCode" element={<RedirectPage />} />
          <Route
            path="/dashboard"
            element={
            }
          />
          <Route
            element={
                <CreateCampaign />
            }
          />
          <Route
            element={
                <MyCampaigns />
            }
          />
          <Route
            element={
                <CampaignDetails />
            }
          />
          <Route
            element={
                <BrowseCampaigns />
            }
          />
          <Route
            element={
                <MyLinks />
            }
          />
          <Route
            element={
                <Earnings />
            }
          />
          <Route
            element={
                <Payouts />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
