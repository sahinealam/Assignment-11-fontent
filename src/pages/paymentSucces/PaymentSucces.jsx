import axios from "axios";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";

//pament success

const PaymentSucces = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    axios
      .post(
        `https://backend11-teal.vercel.app/success-payment?session_id=${sessionId}`,
      )
      .then((res) => {
        console.log(res.data);
      });
  }, [sessionId]);

  return (
    <section className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-base-200 rounded-2xl shadow-xl p-10 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>

        {/* Message */}
        <p className="text-base-content mb-6">
          Thank you for your generous contribution. Your funding will help
          support blood donation activities and save lives.
        </p>

        {/* Extra Info */}
        <div className="bg-base-100 rounded-lg p-4 mb-6 text-sm text-left">
          <p>
            <span className="font-semibold">Transaction Status:</span> Completed
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span> Card
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/Dashboard">
            <button className="btn btn-primary w-full sm:w-auto">
              Go to Dashboard
            </button>
          </Link>

          <Link to="/">
            <button className="btn btn-outline w-full sm:w-auto">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentSucces;
