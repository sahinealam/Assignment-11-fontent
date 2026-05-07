import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Donation = () => {
  const { user } = use(AuthContext);
  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };
    console.log(donorName);

    axios
      .post(
        "https://backend11-teal.vercel.app/create-payment-checkout",
        formData,
      )
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.url;
      });
  };
  return (
    <section className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="text-center ">
        <h1 className="text-3xl font-bold text-red-700">
          Give the Gift of Life
        </h1>
        <p className="mt-2 text-lg">
          Your small donation can save someone’s life today. Join us in making a
          difference.
        </p>
      </div>
      <div>
        <form
          onSubmit={handleCheckout}
          className="flex justify-center items-center gap-4"
        >
          <input
            name="donateAmount"
            type="text"
            placeholder="Type here"
            className="input"
          />
          <button
            className="px-6 py-3 rounded-2xl bg-red-600 text-white 
                                font-semibold shadow-lg hover:bg-red-700 transition transform 
                                hover:-translate-y-1"
            type="submit"
          >
            Donate
          </button>
        </form>
      </div>
    </section>
  );
};

export default Donation;
