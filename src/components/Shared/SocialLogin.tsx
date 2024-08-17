import { useAuth } from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth();

  return (
    <div>
      <button
        className="w-full py-2 font-semibold rounded-lg btn btn-accent text-white"
        onClick={() => {
          googleLogin().then().catch();
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

      <button className="w-full py-2 mt-2 font-semibold rounded-lg btn btn-secondary text-white">
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
