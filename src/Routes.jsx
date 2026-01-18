import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/LandingPage';
import LearningDashboard from './pages/LearningDashboard';
import CodeChallengeEditor from './pages/code-challenge-editor';
import LevelProgressDashboard from './pages/level-progress-dashboard';
import ChallengeSuccess from './pages/challenge-success';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<LearningDashboard />} />
        <Route path="/code-challenge-editor/:moduleId" element={<CodeChallengeEditor />} />
        <Route path="/challenge-success" element={<ChallengeSuccess />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
