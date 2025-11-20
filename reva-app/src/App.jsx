import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Hero from './components/Hero';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import CreateCampaign from './pages/marketer/CreateCampaign';
import MyCampaigns from './pages/marketer/MyCampaigns';
import CampaignDetails from './pages/marketer/CampaignDetails';
import BrowseCampaigns from './pages/promoter/BrowseCampaigns';
import MyLinks from './pages/promoter/MyLinks';
import Earnings from './pages/promoter/Earnings';
import Payouts from './pages/promoter/Payouts';
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
              <ProtectedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketer/create-campaign"
            element={
              <ProtectedRoute>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketer/campaigns"
            element={
              <ProtectedRoute>
                <MyCampaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketer/campaigns/:id"
            element={
              <ProtectedRoute>
                <CampaignDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promoter/campaigns"
            element={
              <ProtectedRoute>
                <BrowseCampaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promoter/links"
            element={
              <ProtectedRoute>
                <MyLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promoter/earnings"
            element={
              <ProtectedRoute>
                <Earnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/promoter/payouts"
            element={
              <ProtectedRoute>
                <Payouts />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
