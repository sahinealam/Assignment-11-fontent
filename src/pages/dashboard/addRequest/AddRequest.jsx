import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddRequest = () => {
    const { user } = use(AuthContext)
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const axiosSecure = useAxiosSecure()


    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => {
                // console.log(res.data.upazilas);
                setUpazilas(res.data.upazilas);
            })
            .catch(err => console.error(err));

        axios.get('/district.json')
            .then(res => {
                // console.log(res.data.districts);
                setDistricts(res.data.districts);
            })
            .catch(err => console.error(err));
    }, []);

    const handleRequest = (e) => {
        e.preventDefault()
        const form = e.target;

        const requesterName = form.requesterName.value;
        const requesterEmail = form.requesterEmail.value;
        const recipientName = form.recipientName.value
        const recipientDistrict = form.recipientDistrict.value;
        const recipientUpazila = form.recipientUpazila.value;
        const hospital = form.hospital.value;
        const address = form.address.value;
        const bloodGroup = form.bloodGroup.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const message = form.message.value;

        const formData = {
            requesterName,
            requesterEmail,
            recipientName,
            recipientDistrict,
            recipientUpazila,
            hospital,
            address,
            bloodGroup,
            donationDate,
            donationTime,
            message,
            donationStatus: 'pending'
        }

        axiosSecure.post('/requests', formData)
            .then(res => {
                toast.success('Request Added Successfully')
                form.reset()
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Create Donation Request</h2>

            <form
                onSubmit={handleRequest}
                className='space-y-5'>
                {/* Requester Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Requester Name</label>
                        <input
                            name='requesterName'
                            type="text"
                            readOnly
                            value={user?.displayName || ""}
                            className="w-full border rounded-lg px-4 py-2 cursor-not-allowed"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Requester Email</label>
                        <input
                            name='requesterEmail'
                            type="email"
                            readOnly
                            value={user?.email || ""}
                            className="w-full border rounded-lg px-4 py-2 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Recipient Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        placeholder="Recipient full name"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* District & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Recipient District</label>
                        <select
                            name="recipientDistrict"
                            required
                            defaultValue="Select Your District"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500">
                            <option disabled={true}>Select Your District</option>
                            {
                                districts.map(district => <option value={district?.name} key={district.id}>{district?.name}</option>)
                            }
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Recipient Upazila</label>
                        <select
                            name="recipientUpazila"
                            required
                            defaultValue="Select Your Upazila"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500">
                            <option disabled={true}>Select Your Upazila</option>
                            {
                                upazilas.map(upazila => <option value={upazila?.name} key={upazila.id}>{upazila?.name}</option>)
                            }
                        </select>
                    </div>
                </div>

                {/* Hospital */}
                <div>
                    <label className="block text-sm font-medium mb-1">Hospital Name</label>
                    <input
                        type="text"
                        name="hospital"
                        placeholder="Hospital where donation will occur"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    />
                </div>


                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Full Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Street, area, city"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-sm font-medium mb-1">Blood Group</label>
                    <select
                        name="bloodGroup"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            required
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                </div>

                {/* Request Message */}
                <div>
                    <label className="block text-sm font-medium mb-1">Request Message</label>
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Explain why blood is needed"
                        required
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                    >
                        Request Donation
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddRequest;