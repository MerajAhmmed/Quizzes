import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backgroundsThree from "../assets/backgrounds/3.jpg";
import useAuth from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
export default function QuizCards() {
  const { quizId } = useParams();
  const { auth } = useAuth();
  const { api } = useAxios();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        let response;
        if (auth?.user?.accessToken) {
          response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes`
          );
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes`
          );
        }

        if (response.status === 200) {
          setQuizzes(response.data.data);
          setError(null);
          const attemptedStatus = {};
          for (const quiz of quizzes) {
            const isAttempted = await checkIfAttempted(quiz.id);
            attemptedStatus[quiz.id] = isAttempted;
          }
          setAttemptedQuizzes(attemptedStatus);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const checkIfAttempted = async (quizId) => {
      if (auth?.user?.accessToken) {
        try {
          const response = await api.get(
            `${
              import.meta.env.VITE_SERVER_BASE_URL
            }/api/quizzes/${quizId}/attempts`
          );
          console.log(response?.data?.attempted);
          return response?.data?.user_attempt?.attempted; // Assuming response includes an 'attempted' field
        } catch (err) {
          console.error(
            `Error fetching attempt status for quiz ${quizId}:`,
            err
          );
          return false;
        }
      }
      return false; // Default to false if user is not logged in
    };
    fetchQuizzes();
  }, [api, auth?.user?.accessToken, quizzes]);

  return (
    <main className="bg-white p-6 rounded-md h-full">
      <section>
        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz.id} className="relative">
                {/* Conditionally render the "Already Participated" overlay */}
                {attemptedQuizzes[quiz.id] && (
                  <div className="absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white grid place-items-center">
                    <div>
                      <h1 className="text-3xl font-bold">
                        Already Participated
                      </h1>
                      <p className="text-center">
                        Click to view your leaderboard
                      </p>
                    </div>
                  </div>
                )}
                <Link
                  to={auth ? `/quiz/${quiz.id}` : "/login"}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
                  key={quiz.id}
                >
                  <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                    <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                      {quiz.title}
                    </h1>
                    <p className="mt-2 text-lg">{quiz.description}</p>
                  </div>
                  <img
                    src={backgroundsThree}
                    alt="JavaScript Hoisting"
                    className="w-full h-full object-cover rounded mb-4 transition-all "
                  />
                </Link>
              </div>
            ))
          ) : (
            <p>No quizzes available</p>
          )}
        </div>
      </section>
    </main>
  );
}
