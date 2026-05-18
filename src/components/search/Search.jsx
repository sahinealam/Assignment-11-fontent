import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
// Search
const Search = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios
      .get("/upazila.json")
      .then((res) => {
        // console.log(res.data.upazilas);
        setUpazilas(res.data.upazilas);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    axios
      .get("/district.json")
      .then((res) => {
        // console.log(res.data.districts);
        setDistricts(res.data.districts);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const hendleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    axios
      .get(
        `https://backend11-teal.vercel.app/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`,
      )
      .then((res) => {
        console.log(res.data);
        setFilterData(res.data);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div>
      <section className="min-h-screen bg-base-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-500 mb-3">
              Search Blood Donors
            </h2>
            <p className="text-base-content max-w-2xl mx-auto">
              Browse available blood donors based on blood group and location.
            </p>
          </div>
          {/* Search Filter */}
          <div className="bg-base-200 rounded-2xl shadow-lg p-8 max-w-5xl mx-auto mb-16">
            <form
              onSubmit={hendleSearch}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <select
                name="blood"
                defaultValue="Chose Blood Group"
                className="select"
              >
                <option disabled={true}>Chose Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                name="district"
                defaultValue="Chose Your District"
                className="select"
              >
                <option disabled={true}>Chose Your District</option>
                {districts.map((district) => (
                  <option value={district?.name} key={district.id}>
                    {district?.name}
                  </option>
                ))}
              </select>

              <select
                name="upazila"
                defaultValue="Chose Your Upazila"
                className="select"
              >
                <option disabled={true}>Chose Your Upazila</option>
                {upazilas.map((upazila) => (
                  <option value={upazila?.name} key={upazila.id}>
                    {upazila?.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn">
                Search
              </button>
            </form>
          </div>
          {filterData.length == 0 ? (
            <h1 className="text-red-500 text-center font-bold text-4xl">
              No Request Found
            </h1>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterData.map((data) => (
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="text-xl font-bold text-red-500">
                      Blood Group: {data.blood}
                    </h3>
                    <p className="text-sm">
                      Recipient Name: {data.recipientName}
                    </p>
                    <p className="text-sm">Location: {data.address}</p>
                    <p className="text-sm">
                      Requester Email: {data.requesterEmail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
