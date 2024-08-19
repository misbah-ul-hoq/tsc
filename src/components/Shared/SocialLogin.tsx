import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import api from "../../axios/api";

const SocialLogin = () => {
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="w-full py-2 font-semibold rounded-lg btn btn-accent text-white"
        onClick={() => {
          googleLogin()
            .then((userCredential) => {
              const user = userCredential.user;
              api.post(`/users?socialLogin=true`, user);
              api.get(`/user/${user.email}`).then((res) => {
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
              Swal.fire({
                title: "Google Login Successfull",
                icon: "success",
              });
              navigate("/");
            })
            .catch((error) => {
              Swal.fire({
                title: error.message,
                icon: "error",
              });
            });
        }}
      >
        <div className="flex items-center justify-center">
          <img
            src="/google.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2 object-cover"
          />
          Sign up with Google
        </div>
      </button>

      <button
        className="w-full py-2 mt-2 font-semibold rounded-lg btn btn-secondary text-white"
        onClick={() => {
          githubLogin()
            .then((userCredential) => {
              const user = userCredential.user;
              api.post(`/users?socialLogin=true`, user);
              api.get(`/user/${user.email}`).then((res) => {
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
              Swal.fire({
                title: "Github Login Successfull",
                icon: "success",
              });
              navigate("/");
            })
            .catch((error) => {
              Swal.fire({
                title: error.message,
                icon: "error",
              });
            });
        }}
      >
        <div className="flex items-center justify-center">
          <img
            src="/github.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2 object-cover"
          />
          Sign up with Github
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;
