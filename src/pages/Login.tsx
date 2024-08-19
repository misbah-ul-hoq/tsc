import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../components/Shared/SocialLogin";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import api from "../axios/api";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { emailLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    emailLogin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        api.get(`/user/${user.email}`).then((res) => {
          console.log(res.data);
          const userInfoJwt = {
            name: res.data.displayName,
            email: res.data.email,
            role: res.data.role,
          };
          api.post("/jwt", userInfoJwt).then((res) => {
            console.log(res.data);
            localStorage.setItem("accessToken", res.data.token);
          });
        });
        setLoading(false);
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: error.message,
          icon: "error",
        });
      });
    // console.log({ email, password });
  };
  return (
    <div
      className="hero bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/animated-bg.jpg)",
        minHeight: "calc(100vh - 68px)",
      }}
    >
      <div className="hero-content">
        <div
          className="card w-full max-w-sm shrink-0 shadow-2xl border border-base-100"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <form onSubmit={handleSubmit} className="card-body pb-0">
            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                id="password"
                className="input input-bordered"
                required
              />
              <img
                src={`${showPassword ? "/eye-off.svg" : "/eye-on.svg"}`}
                alt=""
                className="h-10 absolute right-4 bottom-1"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>

            <div className="form-control mt-6">
              {isLoading && (
                <span className="loading mb-2 loading-spinner loading-lg"></span>
              )}
              <button disabled={isLoading} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="pt-6 text-center pb-6">
            Dont have an account ?{" "}
            <Link to="/signup" className="text-purple-600 text-lg">
              SignUp
            </Link>
          </div>
          <div className="divider mt-0">Or</div>
          <div className="px-3 pb-3">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
