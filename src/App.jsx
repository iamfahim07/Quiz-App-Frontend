import "./App.css";
import { useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
// import QuizOptions from "./pages/QuizOptions";
const QuizOptions = lazy(() => import("./pages/QuizOptions"));
// import Guidelines from "./pages/Guidelines";
const Guidelines = lazy(() => import("./pages/Guidelines"));
// import IntroduceYourself from "./pages/IntroduceYourself";
const IntroduceYourself = lazy(() => import("./pages/IntroduceYourself"));
// import Gameplay from "./pages/Gameplay";
const Gameplay = lazy(() => import("./pages/Gameplay"));
// import AnswerAnalysis from "./pages/AnswerAnalysis";
const AnswerAnalysis = lazy(() => import("./pages/AnswerAnalysis"));
// import Leaderboard from "./pages/Leaderboard";
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
import { Route } from "./router/CustomRouter";
import QuizTopicProvider from "./context/provider/QuizTopicProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./context/provider/AuthProvider";
import AnalysisProvider from "./context/provider/AnalysisProvider";
import chooseTheme from "./utilities/chooseTheme";
import {
  HomeSkeleton,
  CommonSkeletonOne,
  CommonSkeletonTwo,
} from "./skeleton/SkeletonLoaders";
const AdminLogin = lazy(() => import("./admin-pages/AdminLogin"));
const QuizTopicCustomize = lazy(() =>
  import("./admin-pages/QuizTopicCustomize")
);
const QuizQuestionCustomize = lazy(() =>
  import("./admin-pages/QuizQuestionCustomize")
);
const NotFound = lazy(() => import("./components/NotFound"));

// default theme
const defaultTheme = chooseTheme();

function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <div className={currentTheme}>
      <AuthProvider>
        <div className="w-full min-h-screen bg-white dark:bg-[#23272F]">
          <div className="w-full h-3 bg-teal-600"></div>
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 py-3 md:py-5">
            <Header allProps={{ currentTheme, setCurrentTheme, chooseTheme }} />

            <QuizTopicProvider>
              <Route
                path="/"
                component={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />

              <Route
                path="/introduce_yourself"
                component={
                  <PublicRoute>
                    <Suspense fallback={<CommonSkeletonOne />}>
                      <IntroduceYourself />
                    </Suspense>
                  </PublicRoute>
                }
              />
              <Route
                path="/guidelines"
                component={
                  <Suspense fallback={<CommonSkeletonOne />}>
                    <Guidelines />
                  </Suspense>
                }
              />
              <Route
                path="/quiz_options"
                component={
                  <Suspense fallback={<CommonSkeletonTwo />}>
                    <QuizOptions />
                  </Suspense>
                }
              />

              <AnalysisProvider>
                <Route
                  path="/gameplay"
                  component={
                    <ProtectedRoute>
                      <Suspense fallback={<CommonSkeletonTwo />}>
                        <Gameplay />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/answer_analysis/:topic_analysis"
                  component={
                    <ProtectedRoute>
                      <Suspense fallback={<CommonSkeletonTwo />}>
                        <AnswerAnalysis />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
              </AnalysisProvider>
              <Route
                path="/leaderboard/:leaderboard_name"
                component={
                  <Suspense fallback={<CommonSkeletonTwo />}>
                    <Leaderboard />
                  </Suspense>
                }
              />
            </QuizTopicProvider>

            {/* admin route start */}

            <Route
              path="/admin"
              component={
                <Suspense fallback={<CommonSkeletonTwo />}>
                  <AdminLogin />
                </Suspense>
              }
            />

            <Route
              path="/admin/quiz_topic_customize"
              component={
                <Suspense fallback={<CommonSkeletonTwo />}>
                  <QuizTopicCustomize />
                </Suspense>
              }
            />

            <Route
              path="/admin/quiz_question_customize/:topic_name"
              component={
                <Suspense fallback={<CommonSkeletonTwo />}>
                  <QuizQuestionCustomize />
                </Suspense>
              }
            />

            {/* admin route end */}

            {/* not found route start */}
            <Route
              path="/*"
              component={
                <Suspense fallback={<HomeSkeleton />}>
                  <NotFound />
                </Suspense>
              }
            />
            {/* not found route end */}

            <Footer />
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
