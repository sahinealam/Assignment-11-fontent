// import { use, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import { FaEye } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Link, useNavigate } from "react-router";

// const SignUp = () => {
//   const { createUser, setUser, updateUser } = use(AuthContext);
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [upazilas, setUpazilas] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     axios
//       .get("/upazila.json")
//       .then((res) => {
//         // console.log(res.data.upazilas);
//         setUpazilas(res.data.upazilas);
//       })
//       .catch((err) => console.error(err));

//     axios
//       .get("/district.json")
//       .then((res) => {
//         // console.log(res.data.districts);
//         setDistricts(res.data.districts);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     // console.log(e.target)
//     const form = e.target;

//     const name = form.name.value;
//     const email = form.email.value;
//     const password = form.password.value;
//     const photo = form.photo;
//     const file = photo.files[0];
//     const blood = form.blood.value;
//     const district = form.district.value;
//     const upazila = form.upazila.value;

//     // console.log(blood);
//     // console.log({ name, photo, email, password });

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
//     if (!passwordRegex.test(password)) {
//       setFormError(
//         "Password must be at least 6 characters and include at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
//       );
//       return;
//     }

//     const res = await axios.post(
//       `https://api.imgbb.com/1/upload?&key=70a9b49715646353c3c427acfc6b5b47`,
//       { image: file },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );
//     const mainPhoto = res.data.data.display_url;

//     const formData = {
//       name,
//       email,
//       password,
//       mainPhoto,
//       blood,
//       district,
//       upazila,
//     };

//     console.log(formData);

//     if (res.data.success == true) {
//       createUser(email, password)
//         .then((result) => {
//           const user = result.user;
//           console.log(user);
//           updateUser({ displayName: name, photoURL: mainPhoto })
//             .then(() => {
//               setUser({ ...user, displayName: name, photoURL: mainPhoto });

//               navigate("/");
//               toast.success("SignUp Successful");
//               axios
//                 .post("https://backend11-teal.vercel.app/user", formData)
//                 .then((res) => {
//                   console.log(res.data);
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                 });
//             })
//             .catch((error) => {
//               console.log(error);
//               setUser(user);
//             });
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           alert(errorCode, errorMessage);
//         });
//     }
//   };

//   return (
//     <div className="flex justify-center min-h-screen items-center">
//       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
//         <h2 className="text-2xl font-semibold text-center">
//           Sign Up your account
//         </h2>
//         <form onSubmit={handleSignup} className="card-body">
//           <fieldset className="fieldset">
//             {/* name */}
//             <div>
//               <label className="label">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="input"
//                 placeholder="Name"
//                 required
//               />
//             </div>

//             {/* email */}
//             <div>
//               <label className="label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="input"
//                 placeholder="Email"
//                 required
//               />
//             </div>

//             {/* Photo URL */}
//             <div>
//               <label className="label">Photo URl</label>
//               <input
//                 type="file"
//                 name="photo"
//                 className="input"
//                 placeholder="Photo URl"
//                 required
//               />
//             </div>

//             <select
//               name="blood"
//               defaultValue="Chose Blood Group"
//               className="select"
//             >
//               <option disabled={true}>Chose Blood Group</option>
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//             </select>

//             <select
//               name="district"
//               defaultValue="Chose Your District"
//               className="select"
//             >
//               <option disabled={true}>Chose Your District</option>
//               {districts.map((district) => (
//                 <option value={district?.name} key={district.id}>
//                   {district?.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="upazila"
//               defaultValue="Chose Your Upazila"
//               className="select"
//             >
//               <option disabled={true}>Chose Your Upazila</option>
//               {upazilas.map((upazila) => (
//                 <option value={upazila?.name} key={upazila.id}>
//                   {upazila?.name}
//                 </option>
//               ))}
//             </select>

//             {/* password */}
//             <div className="relative">
//               <label className="label">Password</label>
//               <input
//                 type={show ? "text" : "password"}
//                 name="password"
//                 className="input"
//                 placeholder="Password"
//                 required
//               />
//               <span
//                 onClick={() => setShow(!show)}
//                 className="absolute right-7 top-8 cursor-pointer z-50"
//               >
//                 {show ? (
//                   <IoEyeOff className="h-4 w-4"></IoEyeOff>
//                 ) : (
//                   <FaEye className="h-4 w-4"></FaEye>
//                 )}
//               </span>

//               {formError && (
//                 <p className="text-red-500 text-sm mt-1">{formError}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn  mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white"
//             >
//               Registration
//             </button>

//             {/* Divider */}
//             <div className="flex w-full flex-col">
//               <div className="divider">OR</div>
//             </div>

//             <p className="font-semibold pt-5 text-center">
//               Already Have An Account ?
//               <Link className="text-secondary" to="/login">
//                 {" "}
//                 Login
//               </Link>
//             </p>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import { use, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    axios
      .get("/upazila.json")
      .then((res) => {
        setUpazilas(res.data.upazilas);
      })
      .catch((err) => console.error(err));

    axios
      .get("/district.json")
      .then((res) => {
        setDistricts(res.data.districts);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setFormError("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photo = form.photo;
    const file = photo.files[0];
    const blood = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    // password regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setFormError(
        "Password must be at least 6 characters and include 1 uppercase, 1 lowercase, and 1 number.",
      );
      return;
    }

    // confirm password check
    if (password !== confirmPassword) {
      setFormError("Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?&key=70a9b49715646353c3c427acfc6b5b47`,
        { image: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const mainPhoto = res.data.data.display_url;

      const formData = {
        name,
        email,
        password,
        mainPhoto,
        blood,
        district,
        upazila,
      };

      if (res.data.success === true) {
        createUser(email, password)
          .then((result) => {
            const user = result.user;

            updateUser({ displayName: name, photoURL: mainPhoto })
              .then(() => {
                setUser({
                  ...user,
                  displayName: name,
                  photoURL: mainPhoto,
                });

                toast.success("SignUp Successful");
                navigate("/");

                axios
                  .post("https://backend11-teal.vercel.app/user", formData)
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
                setUser(user);
              });
          })
          .catch((error) => {
            alert(error.code, error.message);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="text-2xl font-semibold text-center">
          Sign Up your account
        </h2>

        <form onSubmit={handleSignup} className="card-body">
          <fieldset className="fieldset">
            {/* name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
            </div>

            {/* email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
                required
              />
            </div>

            {/* photo */}
            <div>
              <label className="label">Photo URL</label>
              <input type="file" name="photo" className="input" required />
            </div>

            {/* blood */}
            <select name="blood" className="select">
              <option disabled>Chose Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {/* district */}
            <select name="district" className="select">
              <option disabled>Chose Your District</option>
              {districts.map((district) => (
                <option value={district?.name} key={district.id}>
                  {district?.name}
                </option>
              ))}
            </select>

            {/* upazila */}
            <select name="upazila" className="select">
              <option disabled>Chose Your Upazila</option>
              {upazilas.map((upazila) => (
                <option value={upazila?.name} key={upazila.id}>
                  {upazila?.name}
                </option>
              ))}
            </select>

            {/* password */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input"
                placeholder="Password"
                required
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute right-7 top-8 cursor-pointer z-50"
              >
                {show ? <IoEyeOff /> : <FaEye />}
              </span>
            </div>

            {/* confirm password */}
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="Confirm Password"
                required
              />
            </div>

            {/* error */}
            {formError && (
              <p className="text-red-500 text-sm mt-1">{formError}</p>
            )}

            <button
              type="submit"
              className="btn mt-4 bg-gradient-to-r from-green-600 to-green-800 text-white"
            >
              Registration
            </button>

            <div className="divider">OR</div>

            <p className="text-center font-semibold">
              Already Have An Account?
              <Link className="text-secondary" to="/login">
                {" "}
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
