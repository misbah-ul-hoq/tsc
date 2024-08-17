import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../components/Shared/SocialLogin";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const role = form.get("role") as string;
    const password = form.get("password") as string;
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fillup the password criteria!",
      });
      return;
    }
    console.log({ name, email, password, role });
  };
  return (
    <div className="grid lg:grid-cols-2 gap-5 container-center py-2 md:py-5">
      <div className="illustrator order-1 lg:order-0 mx-auto">
        <img src="/signup-illustrator.svg" alt="" className="w-full" />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg ">
          <h2 className="text-3xl font-extrabold text-center">
            Create an account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="What should we call you?"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border rounded-lg"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border border-gray-300 rounded-lg"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <img
                src={`${showPassword ? "/eye-off.svg" : "/eye-on.svg"}`}
                alt=""
                className="h-10 absolute right-4 bottom-6"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
              <div className="mt-1 text-xs flex items-center gap-3">
                <span className="flex items-center">
                  <img
                    src={password.length >= 6 ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  Minimum 6 characters
                </span>
                <span className="flex items-center">
                  <img
                    src={/[A-Z]/.test(password) ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  One Uppercase
                </span>
                <span className="flex items-center">
                  <img
                    src={/[a-z]/.test(password) ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  One lowercase
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Select Role</label>
              <select
                name="role"
                className="select select-bordered select-sm w-full mt-1"
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-info btn-block text-white">
              Create account
            </button>
          </form>
          <p className="my-3 text-sm text-center">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium text-secondary hover:underline"
            >
              Log in
            </Link>
          </p>

          <div className="divider">OR</div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
