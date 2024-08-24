import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navLinks = (
    <>
      <li className="">
        <NavLink to="/" className="py-3 lg:py-2">
          Home
        </NavLink>
      </li>

      {!user && (
        <>
          <li>
            <NavLink to="/signup" className="py-3 lg:py-2">
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="py-3 lg:py-2">
              Login
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li
            onClick={() => {
              Swal.fire({
                title: "Are you sure to logout?",
                icon: "question",
                showCancelButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  logOut().then(() => {
                    localStorage.removeItem("accessToken");
                  });
                }
              });
            }}
          >
            <a className="py-3 lg:py-2">Logout</a>
          </li>
          <li>
            <NavLink to="/dashboard" className="py-3 lg:py-2">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar bg-accent">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-lg">
          <img src="/logo3.png" alt="" className="h-8" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {user && (
        <div className="navbar-end">
          <img
            src={user?.photoURL || ""}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
