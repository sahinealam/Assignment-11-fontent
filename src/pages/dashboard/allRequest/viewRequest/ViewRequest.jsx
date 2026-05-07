import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useParams } from "react-router";

const ViewRequest = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    axios
      .get(`https://backend11-teal.vercel.app/Dashboard/view-request/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-2xl shadow-lg border border-red-100 overflow-hidden">
        {/* ===== Header ===== */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{data?.recipientName}</h2>
            <p className="text-sm opacity-90">
              Requested by {data?.requesterName}
            </p>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize
            ${data?.donationStatus === "pending" && "bg-yellow-400 text-black"}
            ${data?.donationStatus === "inprogress" && "bg-blue-500"}
            ${data?.donationStatus === "canceled" && "bg-gray-700"}
            ${data?.donationStatus === "done" && "bg-green-500"}
          `}
          >
            {data?.donationStatus}
          </span>
        </div>

        {/* ===== Body ===== */}
        <div className="p-6 space-y-6">
          {/* Blood + Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-red-200 rounded-xl p-5 text-center">
              <p className="text-sm">Blood Group</p>
              <p className="text-3xl font-extrabold text-red-600">
                {data?.bloodGroup}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm">Hospital</p>
              <p className="font-semibold text-gray-800">{data?.hospital}</p>
            </div>
          </div>

          {/* Location */}
          <div className="border rounded-xl p-5">
            <p className="text-sm">Location</p>
            <p className="font-medium">
              {data?.address}, {data?.recipientUpazila},{" "}
              {data?.recipientDistrict}
            </p>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-xl p-5">
              <p className="text-sm">Donation Date</p>
              <p className="font-semibold">{data?.donationDate}</p>
            </div>
            <div className="border rounded-xl p-5">
              <p className="text-sm">Donation Time</p>
              <p className="font-semibold">{data?.donationTime}</p>
            </div>
          </div>

          {/* Message */}
          <div className="border border-red-200 rounded-xl p-5">
            <p className="text-sm mb-1">Request Message</p>
            <p className="leading-relaxed">{data?.message}</p>
          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className="border-t px-6 py-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
          <span className="flex justify-center items-center gap-2">
            <MdOutlineEmail /> {data?.requesterEmail}
          </span>
          <span className="flex justify-center items-center gap-2">
            <FaClock /> Created:{" "}
            {new Date(data?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
