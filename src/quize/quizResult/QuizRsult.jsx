import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/logo-white.svg";
import useAuth from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import QuizResultCorrectAnsShow from "./QuizResultCorrectAnsShow";

export default function QuizRsult() {
  const { api } = useAxios();
  const { auth } = useAuth();
  const [quizResult, setQuizResult] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const fetchResult = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/quizzes/287e6049-9e59-49ea-bb41-9a0387dce648/attempts`
        );

        if (response.status === 200) {
          if (!ignore) {
            setQuizResult(response.data.data);
          }
          setError(null);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchResult();
    return () => {
      ignore = true;
    };
  }, [api]);

  const userResults = quizResult?.attempts?.find(
    (result) => result.user.id === auth.user.id
  );

  const correctAnswers = userResults?.correct_answers;

  const submissionCount = userResults?.submitted_answers?.reduce(
    (acc, submission) => {
      const match = correctAnswers?.some(
        (correct) =>
          correct.question_id === submission.question_id &&
          correct.answer === submission.answer
      );
      return match ? acc + 1 : acc;
    },
    0
  );
  console.log(quizResult?.quiz?.description);
  return (
    <div>
      <div className="flex min-h-screen overflow-hidden">
        <img src={logoWhite} className="max-h-11 fixed left-6 top-6 z-50" />

        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
          <div>
            <div className="text-white">
              <div>
                <h2 className="text-4xl font-bold mb-2">
                  {quizResult?.quiz?.title}
                </h2>
                <p>{quizResult?.quiz?.description}</p>
              </div>

              <div className="my-6 flex items-center  ">
                <div className="w-1/2">
                  <div className="flex gap-6 my-6">
                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {correctAnswers?.length}
                      </p>
                      <p className="text-gray-300">Questions</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {submissionCount}
                      </p>
                      <p className="text-gray-300">Correct</p>
                    </div>

                    <div>
                      <p className="font-semibold text-2xl my-0">
                        {correctAnswers?.length - submissionCount}
                      </p>
                      <p className="text-gray-300">Wrong</p>
                    </div>
                  </div>

                  <Link
                    to="/leaderboard"
                    className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                  >
                    View Leaderboard
                  </Link>
                </div>

                <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold">
                      {submissionCount}/ {correctAnswers?.length}
                    </p>
                    <p>Your Mark</p>
                  </div>
                  <div>
                    <img
                      src="./assets/icons/circular-progressbar.svg"
                      className="h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QuizResultCorrectAnsShow />
      </div>
    </div>
  );
}
