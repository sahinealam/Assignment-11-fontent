import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import ShowDonationRequest from "../showDonationRequest/ShowDonationRequest";

const DonationRequest = () => {
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://backend11-teal.vercel.app/donation-page")
      .then((res) => {
        // console.log(res.data);
        setPendingData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (pendingData.length == 0) {
    return (
      <div className="text-center text-red-500 text-4xl mt-10">
        No requests found.
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="text-center text-3xl font-bold mt-3 mb-10">
        <h1 className="text-red-500">All Donation Requests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
        {pendingData.map((data, index) => (
          <ShowDonationRequest key={index} data={data}></ShowDonationRequest>
        ))}
      </div>
    </div>
  );
};

export default DonationRequest;
