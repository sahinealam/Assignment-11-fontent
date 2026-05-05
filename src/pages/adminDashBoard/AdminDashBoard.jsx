import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaHandHoldingUsd, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from 'recharts';

const AdminDashBoard = () => {
    const axiosSecure = useAxiosSecure()
    const [user, setUser] = useState('')
    const [totalRequest, setTotalRequest] = useState("")
    const [totalFunding, setTotalFunding] = useState('');


    useEffect(() => {
        axiosSecure.get("/users")
            .then(res => {
                setUser(res.data.totaluser)
                // console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            })

        axiosSecure.get(`/all-request`)
            .then((res) => {
                // console.log(res.data);
                setTotalRequest(res.data.totalRequest);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosSecure])

    const chartData = [
        { name: 'Users', value: Number(user) || 0, color: '#8b5cf6' },
        { name: 'Requests', value: Number(totalRequest) || 0, color: '#ef4444' },
        { name: 'Funding', value: Number(totalFunding) / 1000 || 0, color: '#10b981' },
    ];
    return (

        <section className="w-full py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* TOTAL USERS */}
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-widest font-semibold">TOTAL USERS</p>
                            <h2 className="text-3xl font-bold mt-2">{user || 0}</h2>
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:scale-110 transition">
                            <FaUsers className="text-3xl" />
                        </div>
                    </div>
                </div>

                {/* TOTAL FUNDING */}
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-widest font-semibold">TOTAL FUNDING</p>
                            <h2 className="text-3xl font-bold mt-2 flex items-center gap-2">
                                ৳ {(Number(totalFunding) || 0).toLocaleString()}
                            </h2>
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 group-hover:scale-110 transition">
                            <FaHandHoldingUsd className="text-3xl" />
                        </div>
                    </div>
                </div>

                {/* TOTAL REQUEST */}
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500" />
                    <div className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs tracking-widest font-semibold">TOTAL REQUEST</p>
                            <h2 className="text-3xl font-bold mt-2">{totalRequest || 0}</h2>
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-100 text-red-600 group-hover:scale-110 transition">
                            <FaHeartbeat className="text-3xl" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Chart */}
            <div className="mt-10 rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">
                    (Overview)
                </h3>

                <div style={{ height: '220px' }}>
                    <ResponsiveContainer width="99%" height="100%">
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{ top: 5, right: 40, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={80} />
                            <Tooltip
                                formatter={(value) => [`${value.toLocaleString()}`, '']}
                                labelStyle={{ color: '#374151' }}
                            />

                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    formatter={(value) => value.toLocaleString()}
                                    style={{ fill: '#4b5563', fontSize: '13px' }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <p className="text-xs text-center mt-2">
                    (Funding shown in thousands of taka)
                </p>
            </div>

        </section>

    );
};

export default AdminDashBoard;