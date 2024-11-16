import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Field";

export default function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const { isAdmin, ...credentials } = formData;
      console.log("Role", isAdmin ? "admin" : "genarel User");

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,
        credentials
      );
      console.log(response);

      if (response.status === 200) {
        const { user, tokens } = response.data.data;
        setUser({ user, tokens });
      }
      navigate(isAdmin ? "/dashboard" : "/");
    } catch (error) {
      setError("root.random", {
        type: "random", // Corrected typo
        message: `Username and email ${formData.email} are not found`, // Grammar correction
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field
        label="Enter your username or email address"
        error={errors.email}
        className="mb-4"
      >
        {/* <label htmlFor="username" className="block mb-2"></label> */}
        <input
          {...register("email", {
            required: "Enter your username or email address",
          })}
          type="text"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? "border-red-600" : "border-gray-300"
          }`}
          placeholder="Username or email address"
        />
      </Field>
      <Field
        label="Enter your Password"
        className="mb-6"
        error={errors.password}
      >
        {/* <label htmlFor="password" className="block mb-2"></label> */}
        <input
          {...register("password", {
            required: "Enter your password",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 charecter",
            },
          })}
          type="password"
          id="password"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.password ? "border-red-600" : "border-gray-300"
          }`}
          placeholder="Password"
        />
      </Field>
      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("isAdmin")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
}
