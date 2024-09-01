import { Suspense, lazy, useState } from "react";
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AnalysisProvider from "./context/provider/AnalysisProvider";
import AuthProvider from "./context/provider/AuthProvider";
import QuizTopicProvider from "./context/provider/QuizTopicProvider";
import { Route } from "./router/CustomRouter";
import {
  CommonSkeletonOne,
  CommonSkeletonTwo,
  HomeSkeleton,
} from "./skeleton/SkeletonLoaders";
import chooseTheme from "./utilities/chooseTheme";
const Home = lazy(() => import("./pages/Home"));
const QuizOptions = lazy(() => import("./pages/QuizOptions"));
const Guidelines = lazy(() => import("./pages/Guidelines"));
const IntroduceYourself = lazy(() => import("./pages/IntroduceYourself"));
const Gameplay = lazy(() => import("./pages/Gameplay"));
const AnswerAnalysis = lazy(() => import("./pages/AnswerAnalysis"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const AdminLogin = lazy(() => import("./admin-pages/AdminLogin"));
const QuizTopicOrQuestionCustomize = lazy(() =>
  import("./admin-pages/QuizTopicOrQuestionCustomize")
);
const NotFound = lazy(() => import("./components/NotFound"));

// default theme
const defaultTheme = chooseTheme();

function App() {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <div className={currentTheme}>
      <Suspense fallback={<HomeSkeleton />}>
        <AuthProvider>
          <div className="w-full min-h-screen bg-white dark:bg-[#23272F]">
            <div className="w-full h-3 bg-teal-600"></div>
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52 py-3 md:py-5">
              <Header
                allProps={{ currentTheme, setCurrentTheme, chooseTheme }}
              />

              <AdminRoute>
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
                      path="/answer_analysis/:topic_analysis/:topic_analysis_id"
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
                    path="/leaderboard/:leaderboard_name/:leaderboard_id"
                    component={
                      <Suspense fallback={<CommonSkeletonTwo />}>
                        <Leaderboard />
                      </Suspense>
                    }
                  />
                </QuizTopicProvider>
              </AdminRoute>

              {/* admin route start */}

              <Route
                path="/admin"
                component={
                  <PublicRoute>
                    <Suspense fallback={<CommonSkeletonTwo />}>
                      <AdminLogin />
                    </Suspense>
                  </PublicRoute>
                }
              />

              <Route
                path="/admin/quiz_topic_customize"
                component={
                  <ProtectedRoute>
                    <Suspense fallback={<CommonSkeletonTwo />}>
                      <QuizTopicOrQuestionCustomize context="topic" />
                    </Suspense>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/quiz_question_customize/:topic_name/:topic_id"
                component={
                  <ProtectedRoute>
                    <Suspense fallback={<CommonSkeletonTwo />}>
                      <QuizTopicOrQuestionCustomize context="question" />
                    </Suspense>
                  </ProtectedRoute>
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
      </Suspense>
    </div>
  );
}

export default App;
