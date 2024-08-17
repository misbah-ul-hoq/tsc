import { Link } from "react-router-dom";

const LoginForm = () => {
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
          <form className="card-body pb-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="pt-6 text-center pb-6">
            Dont have an account ?{" "}
            <Link to="/signup" className="text-purple-600 text-lg">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
