import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import QuizOptions from "./pages/QuizOptions";
import Guidelines from "./pages/Guidelines";
import IntroduceYourself from "./pages/IntroduceYourself";
import Gameplay from "./pages/Gameplay";
import AnswerAnalysis from "./pages/AnswerAnalysis";
import Leaderboard from "./pages/Leaderboard";
import { Route } from "./router/CustomRouter";
import QuizTopicProvider from "./context/provider/QuizTopicProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./context/provider/AuthProvider";
import AnalysisProvider from "./context/provider/AnalysisProvider";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <AuthProvider>
        <div className="w-full min-h-screen bg-white dark:bg-[#23272F]">
          <div className="w-full h-3 bg-teal-600"></div>
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 py-3 md:py-5">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <QuizTopicProvider>
              <Route path="/" component={<Home />} />

              <Route
                path="/introduce_yourself"
                component={
                  <PublicRoute>
                    <IntroduceYourself />
                  </PublicRoute>
                }
              />
              <Route path="/guidelines" component={<Guidelines />} />
              <Route path="/quiz_options" component={<QuizOptions />} />

              <AnalysisProvider>
                <Route
                  path="/gameplay"
                  component={
                    <ProtectedRoute>
                      <Gameplay />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/answer_analysis/:topic_analysis"
                  component={
                    <ProtectedRoute>
                      <AnswerAnalysis />
                    </ProtectedRoute>
                  }
                />
              </AnalysisProvider>
              <Route
                path="/leaderboard/:leaderboard_name"
                component={<Leaderboard />}
              />
            </QuizTopicProvider>

            <Footer />
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
