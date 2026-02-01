import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL;
    const file = photoURL.filees[0];
    const email = form.email.value;
    const password = form.password.value;
    console.log(file);

    // ONLY password validation
    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error("Password must be 6+ chars with uppercase and lowercase");
      return;
    }

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=`);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
            toast.success("Account created successfully");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    googleSignIn()
      .then(() => {
        toast.success("Google sign-up successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400";

  return (
    <div className="flex justify-center min-h-screen items-center p-4">
      <div className="glass-card max-w-md w-full p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Join LocalChefBazaar</h2>
          <p className="subhead">
            Create your account to order fresh home-cooked meals.
          </p>
        </div>
        <form onSubmit={handleSignup} className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold block">Full name</label>
            <input
              type="text"
              name="name"
              className={inputClass}
              placeholder="full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Photo URL</label>
            <input
              type="file"
              name="photo url"
              className={inputClass}
              placeholder="chosse File Photo"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              className={inputClass}
              placeholder="email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold block">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                className={inputClass}
                placeholder="pasward"
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

          {/* CONFIRM PASSWORD REMOVED */}

          <button
            type="submit"
            className="btn-solid w-full justify-center mt-2"
          >
            Create account
          </button>
        </form>

        <div className="divider-line" />

        <button
          type="button"
          onClick={handleGoogleSignUp}
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-200 hover:text-amber-100 font-semibold"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
