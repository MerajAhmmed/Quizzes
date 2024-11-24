import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import { useQuiz } from "../../hooks/useQuiz";

export default function AdminUpdateQuizSetForm() {
  const navigate = useNavigate();
  const { api } = useAxios();
  const { quizSetId } = useParams();
  const { quizData } = useQuiz(quizSetId);
  const [loading, setLoading] = useState(false);
  const {
    register,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (quizData) {
      reset({
        title: quizData?.title,
        description: quizData?.description,
        status: quizData.status === "draft" ? false : true,
      });
    }
  }, [quizData, reset]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/${quizSetId}`
      );
      if (response.status === 200) {
        toast.success("Quiz Set Deleted Sucessfully");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError("submit", { message: "Failed to delete quiz." });
    }
  };

  const publisQuiz = async () => {
    setLoading(true);
    try {
      const response = await api.patch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/api/admin/quizzes/${quizSetId}`,
        { status: "published" }
      );
      toast.success("quiz Publish successfully");
    } catch (error) {
      setError("submit", { message: "Failed to publish quiz." });
    }
    setLoading(false);
  };

  return (
    <form>
      <div className="mb-4">
        <label
          htmlFor="quiz-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiz title
        </label>
        <input
          {...register("title")}
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Quiz"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="quiz-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          {...register("description")}
          id="description"
          name="description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
      </div>
      {errors["quiz-title"] && (
        <p className="text-red-500 text-sm">{errors["quiz-title"].message}</p>
      )}

      <div className="mx-2 my-6">
        <button
          type="button"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={publisQuiz}
        >
          {loading && <FaSpinner className="animate-spin" />}
          Make Quiz Public
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link
          to={`/admin/quizPage/${quizSetId}/entry`}
          type="submit"
          className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Next
        </Link>
      </div>
    </form>
  );
}
