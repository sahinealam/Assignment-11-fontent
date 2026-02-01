import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google sign-in successful");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    resetPassword(email)
      .then(() => {
        toast.info("Check your email for password reset");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center p-4">
      <div className="glass-card max-w-md w-full p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="subhead">Log in to your chef account or meal orders.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full text-black"
              placeholder="email"
              ref={emailRef}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold block">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                // className="input w-full bg-none"
                // use all input filld use
                className="w-full px-4 py-2 rounded-md
                                       bg-white text-black placeholder-gray-400
                                       border border-gray-300
                                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-200"
              >
                {show ? <IoEyeOff /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleForgetPassword}
            className="text-sm text-amber-200 hover:text-amber-100 transition"
          >
            Forgot password?
          </button>
          <button type="submit" className="btn-solid w-full justify-center">
            Log in
          </button>
        </form>
        <div className="divider-line" />
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 btn-ghost w-full"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="text-center text-sm text-amber-100/80">
          New to LocalChefBazaar?{" "}
          <Link
            to="/signup"
            className="text-amber-200 hover:text-amber-100 font-semibold"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
