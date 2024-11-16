import { Route, Routes } from "react-router-dom";
import AdminDashBoard from "./admin/AdminDashBoard";
import AdminQuizSetEntry from "./admin/AdminQuizSetEntry";
import AdminQuizSetPage from "./admin/AdminQuizSetPage";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import LeaderboardPage from "./quize/LeaderboardPage";
import QuizRsult from "./quize/QuizRsult";
import QuizPage from "./quize/quizPage";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Index />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<AdminDashBoard />} path="/dashboard" />
        <Route element={<AdminQuizSetPage />} path="/quizPage" />
        <Route element={<AdminQuizSetEntry />} path="/quizEntry" />
        <Route element={<QuizRsult />} path="/result" />
        <Route element={<QuizPage />} path="/quiz" />
        <Route element={<LeaderboardPage />} path="/leaderboard" />
      </Routes>
    </>
  );
}
