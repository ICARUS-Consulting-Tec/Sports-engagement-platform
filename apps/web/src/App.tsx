import { Routes, Route } from "react-router-dom";
import MatchesPage from "./pages/MatchesPage";
import MatchRoomPage from "./pages/MatchRoomPage";
import StorePage from "./pages/StorePage";
import PaySuccess from "./pages/paySuccess";
import OffSeasonPage from "./pages/OffSeasonPage";
import TeamPage from "./pages/TeamPage";
import VoiceAgent from "./components/VoiceAgent/VoiceAgent";
import { Signin } from "./components/auth/Signin";
import { Signup } from "./components/auth/Signup";
import PrivateRoute from "./components/auth/privateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MatchesPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/matches/:id" element={<MatchRoomPage />} />
      <Route 
        path="/team" 
        element={
          <PrivateRoute name="">
            <TeamPage />{''}
          </PrivateRoute>
        } 
      />
      <Route path="/store" element={<StorePage />} />
      <Route path="/paySuccess" element={<PaySuccess />} />
      <Route path="/offseason" element={<OffSeasonPage />} />
      <Route path="/voice-agent" element={<VoiceAgent />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
