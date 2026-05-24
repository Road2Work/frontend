import { createBrowserRouter, Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ReadinessHub from "./pages/ReadinessHub";
import RoleSelection from "./pages/RoleSelection";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewOnboarding from "./pages/InterviewOnboarding";
import InterviewStage from "./pages/InterviewStage";
import ResultDashboard from "./pages/ResultDashboard";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

function Root() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: AuthPage },
      { path: "signup", Component: AuthPage },
      { path: "hub", Component: ReadinessHub },
      { path: "start", Component: RoleSelection },
      { path: "setup", Component: InterviewSetup },
      { path: "onboarding", Component: InterviewOnboarding },
      { path: "interview", Component: InterviewStage },
      { path: "results", Component: ResultDashboard },
      { path: "how-it-works", Component: HowItWorks },
      { path: "about", Component: About },
    ],
  },
]);
