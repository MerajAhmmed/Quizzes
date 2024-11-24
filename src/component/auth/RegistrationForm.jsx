import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import Field from "../common/Field";

export default function RegistrationForm() {
  const { api } = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    const payload = {
      ...formData,
      role: formData.isAdmin ? "admin" : "user", // Assign role dynamically
    };

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/register`,
        payload
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError("root.random", {
        type: "random",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(submitForm)}>
      <div className="">
        <Field label="Full Name" error={errors.full_name} className="mb-4">
          <input
            {...register("full_name", {
              required: "Enter your Name",
            })}
            type="text"
            id="name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-600" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
        </Field>

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
      </div>

      <div className="flex  gap-4">
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

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="Confirmpassword"
            className="w-full px-4 py-3 rounded-lg border border-gray-300"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          {...register("isAdmin")}
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
        />
        <label htmlFor="admin" className="block ">
          Register as Admin
        </label>
      </div>
      {/* <p>{errors?.root?.random?.message}</p> */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
}
