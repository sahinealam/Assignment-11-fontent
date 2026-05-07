import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { TbHeartHandshake } from "react-icons/tb";

const DonationDetails = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  useEffect(() => {
    axios
      .get(`https://backend11-teal.vercel.app/donation-details/${id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // donate
  const hendleDonate = (id, donationStatus) => {
    Swal.fire({
      title: `Do you want to Donate?  ${user?.email}  `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Donate",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/donate?id=${id}&status=${donationStatus}`)
          .then((res) => {
            Swal.fire("Your Donate success", "", "success");
            console.log(res.data);
            navigate("/donation-request");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire("Your Donate Not Successfull", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <TbHeartHandshake className="w-10 h-10 text-red-500 mb-2" />
            <h1 className="text-3xl font-semibold text-red-500">
              Donation Requests Details
            </h1>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Requester Name:</span>{" "}
                {details?.requesterName}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Recipient Name:</span>{" "}
                {details?.recipientName}
              </p>

              <p className="text-lg">
                <span className="font-semibold">District:</span>{" "}
                {details?.recipientDistrict}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Full Address:</span>{" "}
                {details?.address}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Requester email:</span>{" "}
                {details?.requesterEmail}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Blood Group:</span>{" "}
                {details?.blood}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Upazila:</span>{" "}
                {details?.recipientUpazila}
              </p>

              <p className="text-lg">
                <span className="font-semibold">Hospital Name:</span>{" "}
                {details?.hospital}
              </p>

              <p className="text-orange-500 text-lg font-semibold">
                Status: {details?.donationStatus}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => hendleDonate(details?._id, "inprogress")}
              className="px-8 py-2 rounded-xl bg-red-500 text-white hover:bg-pink-600 transition"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
